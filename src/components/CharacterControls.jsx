import React, { useContext, useRef, useState } from "react";
import { ControlContext } from "./ControlContext";
import Character from "./modelComponents/Character";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const CharacterControls = () => {
  const walk_speed = 0.3;
  const run_speed = 0.8;
  // const rotation = degToRad(0.75);
  const rotation = degToRad(1);
  const { controls } = useContext(ControlContext);
  const [animation, setAnimation] = useState("happyIdle");
  const rigidBody = useRef();
  const container = useRef();
  const character = useRef();
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rigidBody.current) {
      const velocity = rigidBody.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (controls.forward || get().forward) {
        movement.z = 1;
      }
      if (controls.backward || get().backward) {
        movement.z = -1;
      }

      let speed = controls.run || get().run ? run_speed : walk_speed;

      if (controls.right || get().right) {
        movement.x = -1;
      }
      if (controls.left || get().left) {
        movement.x = 1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += rotation * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        velocity.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        velocity.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;

        if (speed === 0.8) {
          setAnimation("running");
        } else {
          setAnimation("walking");
        }
      } else {
        setAnimation("happyIdle");
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      rigidBody.current.setLinvel(velocity, true);
    }

    // CAMERA
    container.current.rotation.y = lerpAngle(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} lockRotations ref={rigidBody}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1} />
        <group ref={cameraPosition} position-y={0.13} position-z={-0.75} />
        <group ref={character}>
          <Character
            scale={0.002}
            position={[0, -0.229, 0]} // OG
            animation={animation}
          />
          {/* Sphere above character */}
          {/* <mesh position={[0, 24, 0]}>
            <sphereGeometry args={[0.1, 36, 15]} />
            <meshBasicMaterial color="red" />
          </mesh> */}
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.05]} position={[0, -0.1, 0]} />
    </RigidBody>
  );
};

export default CharacterControls;
