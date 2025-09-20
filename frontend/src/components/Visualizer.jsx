// In: src/components/Visualizer.jsx
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ArrayVisualizer from './ArrayVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';
import StackVisualizer from './StackVisualizer';
import TreeVisualizer from './TreeVisualizer';

const Visualizer = ({ dataType, visualData, resetCameraTrigger }) => {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetCameraTrigger]);

  const { arrayData, nodes, head, stack, bst, highlights = {} } = visualData;

  return (
    <div className="w-full h-full rounded-lg relative bg-primary-900 dark:bg-black">
       <div className="absolute inset-0 rounded-lg shadow-inner bg-gradient-to-br from-primary-900/10 to-transparent"></div>
       <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-secondary-500/20 pointer-events-none"></div>
      <Canvas camera={{ position: [0, 2, 18], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
         <pointLight position={[-10, -10, -10]} color="secondary" intensity={1} />
        <OrbitControls ref={controlsRef} />
        
        {dataType === 'array' && (
          <ArrayVisualizer arrayData={arrayData || []} highlights={highlights} />
        )}
        {dataType === 'linkedList' && (
          <LinkedListVisualizer nodes={nodes || []} head={head} highlights={highlights} />
        )}
        {dataType === 'stack' && (
          <StackVisualizer stack={stack || []} highlights={highlights} />
        )}
        {dataType === 'bst' && (
          <TreeVisualizer bst={bst || {}} highlights={highlights} />
        )}
      </Canvas>
    </div>
  );
};

export default Visualizer;