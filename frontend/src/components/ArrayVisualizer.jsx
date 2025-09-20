// In: src/components/ArrayVisualizer.jsx

import React from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const ArrayBlock = ({ position, value, color }) => {
  const springProps = useSpring({
    position,
    color,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <a.group position={springProps.position}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <a.meshStandardMaterial color={springProps.color} />
      </mesh>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.toString()}
      </Text>
    </a.group>
  );
};

const ArrayVisualizer = ({ arrayData, highlights }) => {
  const blockSpacing = 1.5;
  const startX = -((arrayData.length - 1) * blockSpacing) / 2;

  const getBlockColor = (index) => {
    if (highlights.compare?.includes(index)) return 'yellow';
    if (highlights.swap?.includes(index)) return '#ff6b6b';
    if (highlights.overwrite?.includes(index)) return '#82c91e';
    return 'orange';
  };

  return (
    <>
      {arrayData.map((value, index) => {
        const isLifted = highlights.lift?.includes(index);
        const yPos = isLifted ? 1.5 : 0;
        const xPos = startX + index * blockSpacing;
        
        return (
          <ArrayBlock
            key={index}
            position={[xPos, yPos, 0]}
            value={value}
            color={getBlockColor(index)}
          />
        );
      })}
    </>
  );
};

export default ArrayVisualizer;