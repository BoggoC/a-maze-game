import { EffectComposer, GodRays } from "@react-three/postprocessing";
import React, { useRef, useEffect, useState } from "react";

const LightBulbEffect = () => {
  const lightBulb = useRef();
  const [isLightBulbReady, setIsLightBulbReady] = useState(false);

  useEffect(() => {
    if (lightBulb.current) {
      setIsLightBulbReady(true);
    }
  }, [lightBulb.current]);

  return (
    <>
      <mesh ref={lightBulb} position={[15, 7, 18]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="white" transparent opacity={1} />
      </mesh>
      {isLightBulbReady && (
        <EffectComposer>
          <GodRays sun={lightBulb.current} samples={50} blur={true} />
        </EffectComposer>
      )}
    </>
  );
};

export default LightBulbEffect;
