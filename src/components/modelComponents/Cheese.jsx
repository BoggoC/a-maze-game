/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 cheese.glb --transform --shadows 
Files: cheese.glb [382.48KB] > C:\Users\bogda\Desktop\Cheese\cheese-transformed.glb [40.5KB] (89%)
Author: osaifos (https://sketchfab.com/Seesio)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/just-cheese-2a4b93077b574f019d41dea5cbc1c8cd
Title: Just Cheese
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Cheese(props) {
  const rotationAxis = useRef();
  useFrame(() => {
    rotationAxis.current.rotation.y += 0.01;
  });

  const { nodes, materials } = useGLTF("/cheese-transformed.glb");
  return (
    <group
      {...props}
      dispose={null}
      ref={rotationAxis}
      position={[-0.4, -0.4, 8.9]}
      scale={0.13}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.Cheese}
        position={[0.006, 0.381, -0.459]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.material_0}
        position={[0.006, 0.381, -0.459]}
      />
    </group>
  );
}

useGLTF.preload("/cheese-transformed.glb");

export default Cheese;
