import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { OrthographicCamera } from "@react-three/drei";

const MiniMap = ({ characterPosition, onClick = { onClick } }) => {
  // Load the minimap texture
  const map = useLoader(THREE.TextureLoader, "minimap.png");

  // State to store trail positions with maximum limit
  const [trail, setTrail] = useState([]);
  const lastTrailUpdateTimeRef = useRef(0);
  const MAX_TRAIL_POINTS = 2500;
  const TRAIL_UPDATE_INTERVAL = 200;

  // State to manage minimap fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { viewport } = useThree();

  // Calculate fullscreen dimensions (90% of width or height depending on aspect ratio)
  const getFullscreenSize = () => {
    if (viewport.width > viewport.height) {
      // Landscape orientation - limit by height
      const height = viewport.height * 0.9;
      return { width: height, height };
    } else {
      // Portrait orientation - limit by width
      const width = viewport.width * 0.9;
      return { width, height: width };
    }
  };

  // Calculate the position scaling factor based on current map size
  const getPositionScalingFactor = () => {
    if (isFullscreen) {
      const fullscreenSize = getFullscreenSize();
      // Calculate ratio between fullscreen size and default size
      return fullscreenSize.width / 2;
    }
    // Default scaling factor for non-fullscreen
    return 1;
  };

  // Adjust the character's position on the minimap to compensate for the map's offset
  const adjustedCharacterPositionX = characterPosition.x * 0.1 + 0.02;
  const adjustedCharacterPositionZ = -characterPosition.z * 0.1 - -0.915;

  // Apply scaling factor to positions for display on fullscreen minimap
  const scalingFactor = getPositionScalingFactor();
  const displayPositionX = adjustedCharacterPositionX * scalingFactor;
  const displayPositionZ = adjustedCharacterPositionZ * scalingFactor;

  // Update trail positions with throttling
  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime() * 1000;
    if (currentTime - lastTrailUpdateTimeRef.current > TRAIL_UPDATE_INTERVAL) {
      setTrail((prevTrail) => {
        // Create new position
        const newPos = {
          x: adjustedCharacterPositionX,
          z: adjustedCharacterPositionZ,
        };

        // Only add if we've moved a minimum distance from the last point
        const lastPoint =
          prevTrail.length > 0 ? prevTrail[prevTrail.length - 1] : null;
        if (
          !lastPoint ||
          Math.hypot(newPos.x - lastPoint.x, newPos.z - lastPoint.z) > 0.01
        ) {
          // Add new point but limit the total number
          const newTrail = [...prevTrail, newPos];
          if (newTrail.length > MAX_TRAIL_POINTS) {
            return newTrail.slice(-MAX_TRAIL_POINTS);
          }
          return newTrail;
        }
        // No change needed
        return prevTrail;
      });
      lastTrailUpdateTimeRef.current = currentTime;
    }
  });

  // onClick handler for the minimap
  const handleMiniMapClick = () => {
    setIsFullscreen(!isFullscreen);
    if (onClick) onClick();
  };

  return (
    <group onClick={handleMiniMapClick}>
      <ambientLight intensity={1} />
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={108.5} />

      <mesh rotation={[0, 0, Math.PI]}>
        <planeGeometry
          attach={"geometry"}
          args={
            isFullscreen
              ? [getFullscreenSize().width, getFullscreenSize().height]
              : [2, 2]
          }
        />
        <meshBasicMaterial attach={"material"} map={map} />
        {trail.map((pos, index) => (
          <mesh
            key={index}
            position={[pos.x * scalingFactor, pos.z * scalingFactor, 0]}
            scale={[0.2, 0.2, 0.2]}
          >
            <sphereGeometry attach={"geometry"} args={[0.05, 32, 32]} />
            <meshBasicMaterial attach={"material"} color="blue" />
          </mesh>
        ))}
        <mesh
          position={[displayPositionX, displayPositionZ, 0]}
          scale={[0.2, 0.2, 0.2]}
        >
          <sphereGeometry
            attach={"geometry"}
            args={[0.1 * scalingFactor, 32, 32]}
          />
          <meshBasicMaterial attach={"material"} color="red" />
        </mesh>
      </mesh>
    </group>
  );
};

export default MiniMap;
