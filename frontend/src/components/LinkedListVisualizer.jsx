// In: src/components/LinkedListVisualizer.jsx

import React from 'react';
import { Text, Cylinder, Line, Cone } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

const PointerArrow = ({ start, end, color = 'white' }) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  return (
    <group>
      <Line points={[startVec, endVec]} color={color} lineWidth={2} />
      <Cone args={[0.2, 0.5, 16]} position={endVec} rotation-x={-Math.PI / 2}>
        <meshStandardMaterial color={color} />
      </Cone>
    </group>
  );
};

const Node = ({ position, value, color = 'royalblue', opacity = 1, scale = 1 }) => {
  const springProps = useSpring({
    position,
    color,
    opacity,
    scale,
    config: { tension: 280, friction: 60 },
  });

  return (
    <a.group position={springProps.position} scale={springProps.scale}>
      <Cylinder args={[0.7, 0.7, 0.4, 32]}>
        <a.meshStandardMaterial color={springProps.color} transparent opacity={springProps.opacity} />
      </Cylinder>
      <a.group opacity={springProps.opacity}>
        <Text
            position={[0, 0, 0.25]}
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

const LinkedListVisualizer = ({ nodes, head, highlights }) => {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const nodePositions = new Map();
    const blockSpacing = 3.0;
    
    const orderedNodes = [];
    let currentNodeId = head;
    while(currentNodeId !== null && nodeMap.has(currentNodeId)) {
        orderedNodes.push(nodeMap.get(currentNodeId));
        currentNodeId = nodeMap.get(currentNodeId).next;
    }

    orderedNodes.forEach((node, index) => {
        nodePositions.set(node.id, [index * blockSpacing, 0, 0]);
    });
    
    const floatingNodes = nodes.filter(node => !nodePositions.has(node.id));
    floatingNodes.forEach((node) => {
        nodePositions.set(node.id, [-blockSpacing, 2, 0]);
    });

    const getNodeColor = (nodeId) => {
        if (highlights.found?.includes(nodeId)) return 'tomato';
        if (highlights.traverse?.includes(nodeId)) return 'yellow';
        if (highlights.create?.includes(nodeId)) return 'springgreen';
        if (highlights.prev?.includes(nodeId)) return 'lightblue';
        return 'royalblue';
    };

    return (
        <>
            {head !== null && nodePositions.has(head) && (
                <>
                    <Text position={[-blockSpacing, 1, 0]} fontSize={0.5} color="lightblue">HEAD</Text>
                    <PointerArrow
                        start={[-blockSpacing, 0.8, 0]}
                        end={[nodePositions.get(head)[0], nodePositions.get(head)[1] + 0.5, 0]}
                        color="lightblue"
                    />
                </>
            )}

            {nodes.map((node) => (
                <Node
                    key={node.id}
                    position={nodePositions.get(node.id)}
                    value={node.value}
                    color={getNodeColor(node.id)}
                    opacity={highlights.delete?.includes(node.id) ? 0 : 1}
                    scale={highlights.delete?.includes(node.id) ? 0 : 1}
                />
            ))}

            {nodes.map((node) => {
                if (node.next && nodePositions.has(node.id) && nodePositions.has(node.next)) {
                    const startPoint = nodePositions.get(node.id);
                    const endPoint = nodePositions.get(node.next);
                    
                    const adjustedStart = [startPoint[0] + 0.8, startPoint[1], startPoint[2]];
                    const adjustedEnd = [endPoint[0] - 0.8, endPoint[1], endPoint[2]];

                    return <PointerArrow key={`arrow-${node.id}`} start={adjustedStart} end={adjustedEnd} />;
                }
                return null;
            })}
        </>
    );
};

export default LinkedListVisualizer;