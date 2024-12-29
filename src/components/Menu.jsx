import React from "react";
import { Canvas } from "@react-three/fiber";
import Character from "./modelComponents/Character";
import { Environment, OrbitControls } from "@react-three/drei";

const Menu = ({ onStart }) => {
  return (
    <>
      <div className="menu">
        <div className="menu-container">
          <h1 className="title">A-MAZE-GAME</h1>
          <div className="text">
            <p className="text-blocks">
              Bad person in a white coat put Mousey in a green enclosure without
              a roof, filled with paths with dead ends. Mousey is so annoyed.
              But Mousey smells cheese! Delicious, stinky cheese! Is it{" "}
              <b>Swiss</b>? <b>Gouda</b>? <b>Blue</b>? <b>Pecorino</b>?{" "}
              <b>Munster</b>? Who cares? They're all delicious! Mousey can't
              wait to find it. Mousey must find it!
            </p>
            <p className="text-blocks">
              Help Mousey find the cheese in the middle of the maze. Use the{" "}
              <b className="bold">arrow</b> or <b className="bold">wasd</b> keys
              to move around and the <b className="bold">space bar</b> to run
              when a <u className="underlined">keyboard</u> is present or the{" "}
              <b className="bold">joystick</b> to move and{" "}
              <b className="bold">button</b> to run when using a{" "}
              <u className="underlined">touchscreen device</u>.
              {/* Click or press on the mini-map to expand it. */}
            </p>
            <div className="btn-container">
              <button onClick={onStart} className="btn ">
                Let's start!
              </button>
            </div>
          </div>
        </div>
        <div className="canvas">
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.01,
              far: 2000,
              position: [-3, 2, 3.2],
            }}
          >
            <OrbitControls />
            <directionalLight
              intensity={2}
              receiveShadow
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              position={[3, 3, 0]}
            ></directionalLight>
            <ambientLight intensity={0.5} />
            <Environment preset="sunset" />
            <Character
              animation="dancing"
              scale={0.024}
              position={[0, -1.45, 0]}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default Menu;
