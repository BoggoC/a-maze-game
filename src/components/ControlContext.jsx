import React, { createContext, useState } from "react";

export const ControlContext = createContext();

const ControlProvider = ({ children }) => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
  });

  return (
    <ControlContext.Provider value={{ controls, setControls }}>
      {children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;
