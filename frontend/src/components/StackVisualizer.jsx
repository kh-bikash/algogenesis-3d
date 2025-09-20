import React from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const StackBlock = ({ position, value, color, opacity, scale }) => {
  const springProps = useSpring({
    position,
    color,
    opacity,
    scale,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <a.group position={springProps.position} scale={springProps.scale}>
      <mesh>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <a.meshStandardMaterial color={springProps.color} transparent opacity={springProps.opacity} />
      </mesh>
      <a.group opacity={springProps.opacity}>
        <Text
          position={[0, 0, 0.8]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {value.toString()}
        </Text>
      </a.group>
    </a.group>
  );
};

const StackVisualizer = ({ stack = [], highlights = {} }) => {
  const blockSpacing = 1.2;

  const getNodeColor = (nodeId) => {
    if (highlights.create?.includes(nodeId)) return 'springgreen';
    if (highlights.pop?.includes(nodeId)) return 'tomato';
    return '#6366f1';
  };

  return (
    <>
      {stack.length > 0 && (
        <group position={[2.5, (stack.length - 1) * blockSpacing, 0]}>
          <Text fontSize={0.5} color="lightblue">TOP</Text>
        </group>
      )}

      {stack.map((node, index) => {
        let position = [0, index * blockSpacing, 0];
        if (highlights.create?.includes(node.id) && !highlights.moveToStack?.includes(node.id)) {
          position = [-4, (stack.length - 1) * blockSpacing, 0];
        }

        return (
          <StackBlock
            key={node.id}
            position={position}
            value={node.value}
            color={getNodeColor(node.id)}
            opacity={highlights.delete?.includes(node.id) ? 0 : 1}
            scale={highlights.delete?.includes(node.id) ? 0 : 1}
          />
        );
      })}
    </>
  );
};

export default StackVisualizer;
