import React from 'react';
import { Text, Sphere, Line } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const TreeNode = ({ position, value, color }) => {
  const springProps = useSpring({
    position,
    color,
    config: { tension: 280, friction: 60 },
  });

  return (
    <a.group position={springProps.position}>
      <Sphere args={[0.5, 32, 32]}>
        <a.meshStandardMaterial color={springProps.color} />
      </Sphere>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.toString()}
      </Text>
    </a.group>
  );
};

const TreeVisualizer = ({ bst = {}, highlights = {} }) => {
  const { nodes = {}, root = null } = bst;
  const nodePositions = new Map();
  const verticalSpacing = -2;
  const horizontalSpacing = 16;

  const calculatePositions = (nodeId, x = 0, y = 0, depth = 0) => {
    if (!nodeId || !nodes[nodeId]) return;

    nodePositions.set(nodeId, [x, y, 0]);
    const spacing = horizontalSpacing / Math.pow(2, depth + 1);

    const leftId = nodes[nodeId].left;
    const rightId = nodes[nodeId].right;

    calculatePositions(leftId, x - spacing, y + verticalSpacing, depth + 1);
    calculatePositions(rightId, x + spacing, y + verticalSpacing, depth + 1);
  };

  calculatePositions(root);

  if (highlights.create?.nodeId) {
    const rootPos = nodePositions.get(root) || [0, 2, 0];
    nodePositions.set(highlights.create.nodeId, [rootPos[0], rootPos[1] + 2, 0]);
  }

  const getNodeColor = (nodeId) => {
    if (highlights.found?.includes(nodeId)) return 'tomato';
    if (highlights.traverse?.includes(nodeId)) return 'yellow';
    if (highlights.create?.nodeId === nodeId) return 'springgreen';
    return '#6366f1';
  };

  const allNodes = Object.values(nodes);

  return (
    <group position={[0, 2, 0]}>
      {allNodes.map(node => {
        if (node.parentId == null) return null;
        const startPos = nodePositions.get(node.parentId);
        const endPos = nodePositions.get(node.id);
        if (!startPos || !endPos) return null;
        return <Line key={`edge-${node.id}`} points={[startPos, endPos]} color="white" lineWidth={1} />;
      })}

      {allNodes.map(node => (
        <TreeNode
          key={node.id}
          position={nodePositions.get(node.id)}
          value={node.value}
          color={getNodeColor(node.id)}
        />
      ))}
    </group>
  );
};

export default TreeVisualizer;
