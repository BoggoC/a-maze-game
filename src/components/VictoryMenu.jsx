import React, { useState } from "react";
import { Html } from "@react-three/drei";

const VictoryMenu = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Html
      position={[-0.4, 0, 10]}
      rotation={[0, Math.PI, 0]}
      occlude
      transform
      scale={0.05}
    >
      <div
        style={{
          fontFamily: "'Roboto', serif",
          color: "#dcfce7",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "32px 0px",
          }}
        >
          <h1>WOOHOO!</h1>
          <button
            style={{
              color: "#dcfce7",
              background: "none",
              borderStyle: "none",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            X
          </button>
        </div>
        <p>
          Congratulations! You helped Mousey find the cheese. Mousey has never
          been quite this happy.
          <br />
          <br />
          You can now move the camera around or zoom in and out.
        </p>
      </div>
    </Html>
  );
};

export default VictoryMenu;
