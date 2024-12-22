import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import React, { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import ControlProvider from "./components/ControlContext";
import ControlButtons from "./components/ControlButtons";
import IsTouchDevice from "./components/IsTouchDevice";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "run", keys: ["Space"] },
];

const App = () => {
  return (
    <ControlProvider>
      <KeyboardControls map={keyboardMap}>
        {IsTouchDevice() && <ControlButtons />}
        <Suspense fallback={null}>
          <Canvas shadows>
            <Scene />
          </Canvas>
        </Suspense>
      </KeyboardControls>
    </ControlProvider>
  );
};

export default App;
