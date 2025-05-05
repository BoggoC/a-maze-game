import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { KeyboardControls, View, Bounds } from "@react-three/drei";
import ControlProvider from "./components/ControlContext";
import ControlButtons from "./components/ControlButtons";
import IsTouchDevice from "./components/IsTouchDevice";
import Scene from "./components/Scene";
import MiniMap from "./components/MiniMap";
import Menu from "./components/Menu";

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
  const [isMiniMapFullscreen, setIsMiniMapFullscreen] = useState(false);

  const ref = useRef();

  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handleVictory = () => {
    setIsVictory(true);
  };

  const [characterPosition, setCharacterPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleMiniMapClick = () => {
    setIsMiniMapFullscreen(!isMiniMapFullscreen);
  };

  return (
    <ControlProvider>
      <KeyboardControls map={keyboardMap}>
        {IsTouchDevice() && <ControlButtons />}
        <Suspense fallback={null}>
          {!isGameStarted && <Menu onStart={handleStart} />}
          {isGameStarted && (
            <div ref={ref} className="container">
              <View index={1} className="view1">
                <Bounds>
                  <Scene
                    onVictory={handleVictory}
                    setCharacterPosition={setCharacterPosition}
                  />
                </Bounds>
              </View>
              {!isVictory && (
                <View
                  index={2}
                  className={`view2 ${isMiniMapFullscreen ? "fullscreen" : ""}`}
                >
                  <Bounds fit clip margin={0.75}>
                    <MiniMap
                      characterPosition={characterPosition}
                      onClick={handleMiniMapClick}
                    />
                  </Bounds>
                </View>
              )}
              <Canvas eventSource={ref} className="canvas" shadows>
                <View.Port />
              </Canvas>
            </div>
          )}
        </Suspense>
      </KeyboardControls>
    </ControlProvider>
  );
};

export default App;
