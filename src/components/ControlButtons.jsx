import React, { useContext } from "react";
import { ControlContext } from "./ControlContext";
import Nipple from "react-nipple";
import "react-nipple/lib/styles.css";

const ControlButtons = () => {
  const { controls, setControls } = useContext(ControlContext);

  const handleJoystickMove = (evt, data) => {
    const { direction } = data;
    if (direction) {
      // Reset controls state before setting the new direction
      const newControls = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        run: controls.run,
      };

      switch (direction.angle) {
        case "up":
          newControls.forward = true;
          break;
        case "down":
          newControls.backward = true;
          break;
        case "left":
          newControls.left = true;
          break;
        case "right":
          newControls.right = true;
          break;
        default:
          break;
      }

      setControls(newControls);
    }
  };

  const handleJoystickEnd = () => {
    setControls({
      forward: false,
      backward: false,
      left: false,
      right: false,
      run: controls.run,
    });
  };

  return (
    <div className="btns">
      <div className="left-group">
        <Nipple
          className="joystick"
          options={{
            mode: "static",
            position: { top: "50%", left: "50%" },
            color: "#ffffff",
            size: 75,
          }}
          style={{
            width: 75,
            height: 75,
            position: "relative",
            margin: "auto",
          }}
          onMove={handleJoystickMove}
          onEnd={handleJoystickEnd}
        />
      </div>
      <div className="right-group">
        <button
          id="run-button"
          className="ui run"
          onTouchStart={(e) => {
            e.preventDefault();
            setControls({ ...controls, run: true });
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setControls({ ...controls, run: false });
          }}
        ></button>
      </div>
    </div>
  );
};

export default ControlButtons;
