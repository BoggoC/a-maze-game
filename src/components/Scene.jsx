import {
  PerspectiveCamera,
  Environment,
  MapControls,
  useHelper,
} from "@react-three/drei";
import React, { useLayoutEffect, useRef } from "react";
import Maps from "./modelComponents/Maps";
import { Physics } from "@react-three/rapier";
import CharacterControls from "./CharacterControls";
import LightBulbEffect from "./LightBulbEffect";
import OfficeLamp from "./modelComponents/DeskLamp";
import Cheese from "./modelComponents/Cheese";

const Scene = ({ onVictory }) => {
  const dirLight = useRef();

  // Helpers
  // const shadowCameraRef = useRef();
  // useHelper(shadowCameraRef, THREE.CameraHelper);

  useLayoutEffect(() => {
    dirLight.current.target.position.set(0, -8, 9.15);
    dirLight.current.target.updateMatrixWorld();
  }, []);

  return (
    <>
      <MapControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={false}
        enableRotate={false}
      />
      <Environment preset="sunset" />
      <PerspectiveCamera
        makeDefault
        fov={45}
        near={0.01}
        far={2000}
        aspect={1}
        position={[3, 3, 3]}
      />
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={dirLight}
        intensity={2}
        receiveShadow
        castShadow
        position={[15, 7, 18]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={50}
        shadow-camera-top={-15}
        shadow-camera-right={15}
        shadow-camera-left={-15}
        shadow-camera-bottom={15}
        shadow-bias={-0.0015}
      >
        {/* <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" /> */}
      </directionalLight>
      <Physics>
        {/* <Physics debug> */}
        <Maps />
        <CharacterControls />
        <Cheese onVictory={onVictory} />
      </Physics>
      <OfficeLamp />
      <LightBulbEffect />
    </>
  );
};

export default Scene;
