import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 30;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5; // X
      pos[i * 3 + 1] = Math.random() * 4 - 1.5; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate the coordinate space slowly
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      
      const geo = pointsRef.current.geometry;
      const attr = geo.attributes.position;
      const array = attr.array as Float32Array;

      // Animate particles upwards
      for (let i = 0; i < count; i++) {
        array[i * 3 + 1] += 0.0025; // drift up
        
        // Add subtle horizontal wave motion
        array[i * 3] += Math.sin(state.clock.getElapsedTime() + i) * 0.001;

        // Reset particle if it drifts too high
        if (array[i * 3 + 1] > 2.5) {
          array[i * 3 + 1] = -1.5;
          array[i * 3] = (Math.random() - 0.5) * 5;
          array[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#06b6d4"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
