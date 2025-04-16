import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React, { useEffect, useState } from "react";

const LightBulbEffect = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {ready && (
        <EffectComposer multisampling={8}>
          <Bloom
            mipmapBlur={true}
            intensity={10}
            luminanceThreshold={0.95}
            luminanceSmoothing={0.035}
          />
        </EffectComposer>
      )}
    </>
  );
};

export default LightBulbEffect;
