import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Physics } from "@react-three/rapier";
import { Vector3 } from "three";
import Maps from "./modelComponents/Maps";
import CharacterControls from "./CharacterControls";
import LightBulbEffect from "./LightBulbEffect";
import OfficeLamp from "./modelComponents/OfficeLamp";
import Cheese from "./modelComponents/Cheese";
import VictoryMenu from "./VictoryMenu";

const Scene = ({ onVictory, setCharacterPosition }) => {
  const [isVictory, setIsVictory] = useState(false);
  const [orbitTarget, setOrbitTarget] = useState(new Vector3(0, 0, 0));
  const dirLight = useRef();

  // Helpers
  // const shadowCameraRef = useRef();
  // useHelper(shadowCameraRef, THREE.CameraHelper);

  useLayoutEffect(() => {
    dirLight.current.target.position.set(0, -8, 9.15);
    dirLight.current.target.updateMatrixWorld();
  }, []);

  const handleVictory = () => {
    setIsVictory(true);
    onVictory();
  };

  return (
    <>
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        enableZoom={isVictory}
        enableRotate={isVictory}
        maxDistance={isVictory ? 1.5 : undefined}
        minDistance={isVictory ? 0.5 : undefined}
        minPolarAngle={isVictory ? 0 : undefined}
        maxPolarAngle={isVictory ? Math.PI / 2 : undefined}
        target={orbitTarget}
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
        <CharacterControls
          setCharacterPosition={setCharacterPosition}
          isVictory={isVictory}
          setOrbitTarget={setOrbitTarget}
        />
        <Cheese onVictory={handleVictory} />
      </Physics>
      {isVictory && <VictoryMenu />}
      <OfficeLamp />
      <LightBulbEffect />
    </>
  );
};

export default Scene;
