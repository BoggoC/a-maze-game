import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import React, { Suspense, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import ControlProvider from "./components/ControlContext";
import ControlButtons from "./components/ControlButtons";
import IsTouchDevice from "./components/IsTouchDevice";
import Menu from "./components/Menu";
import VictoryMenu from "./components/VictoryMenu";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "run", keys: ["Space"] },
];

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handleVictory = () => {
    setIsVictory(true);
  };

  return (
    <ControlProvider>
      <KeyboardControls map={keyboardMap}>
        {IsTouchDevice() && <ControlButtons />}
        <Suspense fallback={null}>
          {!isGameStarted && <Menu onStart={handleStart} />}
          {isGameStarted && (
            <Canvas shadows>
              <Scene onVictory={handleVictory} />
            </Canvas>
          )}
          {isVictory && <VictoryMenu />}
        </Suspense>
      </KeyboardControls>
    </ControlProvider>
  );
};

export default App;
