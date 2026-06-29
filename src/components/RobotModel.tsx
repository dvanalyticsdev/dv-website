import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RobotModelProps {
  pose: 'idle' | 'wave' | 'programs' | 'benefits' | 'roadmap' | 'footer';
  isHovered: boolean;
  isClicked: boolean;
  onModelClick: () => void;
  blinkTrigger?: number;
  globalMouse: { x: number; y: number };
}

export const RobotModel: React.FC<RobotModelProps> = ({
  pose,
  isHovered,
  isClicked,
  onModelClick,
  blinkTrigger = 0,
  globalMouse,
}) => {
  // References for animations
  const mainGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const planetOrbRef = useRef<THREE.Group>(null);

  // Entrance animation variables
  const [entranceProgress, setEntranceProgress] = useState(0);
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) {
        progress = 1;
        clearInterval(interval);
      }
      setEntranceProgress(progress);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Trigger blink from global click events
  useEffect(() => {
    if (blinkTrigger > 0) {
      isBlinking.current = true;
      blinkPhase.current = 0;
    }
  }, [blinkTrigger]);

  // Blinking system
  const blinkTimer = useRef<number>(0);
  const isBlinking = useRef<boolean>(false);
  const blinkDuration = 0.15;
  const blinkPhase = useRef<number>(0);

  // Materials
  const whitePlasticMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.12,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const lightBlueMetallicMaterial = new THREE.MeshStandardMaterial({
    color: '#70b5f5',
    roughness: 0.22,
    metalness: 0.7,
  });

  const glowingCyanMaterial = new THREE.MeshBasicMaterial({
    color: '#80f5ff',
  });

  const darkScreenMaterial = new THREE.MeshStandardMaterial({
    color: '#0e121e',
    roughness: 0.18,
    metalness: 0.8,
  });

  const planetBlueMaterial = new THREE.MeshStandardMaterial({
    color: '#3252e0',
    roughness: 0.2,
    metalness: 0.6,
  });

  const whiteRingMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.9,
  });

  // Curved path for the right arm (holding the orb)
  const rightArmCurve = React.useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),           // shoulder
      new THREE.Vector3(-0.35, -0.22, 0.08), // elbow bend
      new THREE.Vector3(-0.30, 0.18, 0.14)   // hand cuff
    );
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Clamp the global mouse coordinates so it acts as a normalized direction [-1.2, 1.2]
    const px = THREE.MathUtils.clamp(globalMouse.x, -1.2, 1.2);
    const py = THREE.MathUtils.clamp(globalMouse.y, -1.2, 1.2);

    // 1. Entrance Elastic Scale
    const targetScale = THREE.MathUtils.lerp(0.01, 1.0, easeOutElastic(entranceProgress));
    if (mainGroupRef.current) {
      mainGroupRef.current.scale.setScalar(targetScale);
    }

    // 2. Floating & Breathing Animation
    const floatOffset = Math.sin(time * 1.8) * 0.15;
    const swayOffset = Math.sin(time * 0.7) * 0.025;

    // Hover translation movement (drifts towards mouse coordinates when active)
    let targetX = 0;
    let targetY = 0;
    if (isHovered || isClicked) {
      targetX = px * 0.28;
      targetY = py * 0.24;
    }

    if (mainGroupRef.current) {
      mainGroupRef.current.position.x = THREE.MathUtils.lerp(mainGroupRef.current.position.x, targetX, 0.08);
      mainGroupRef.current.position.y = THREE.MathUtils.lerp(mainGroupRef.current.position.y, floatOffset + targetY, 0.08);
      mainGroupRef.current.rotation.z = swayOffset + px * 0.08;
      mainGroupRef.current.rotation.x = -py * 0.06;
    }

    // 3. Mouse Cursor Clamped Tracking

    let targetHeadY = px * 0.65;
    let targetHeadX = -py * 0.45;

    // Direct head slightly for scroll poses
    if (pose === 'programs') {
      targetHeadY = -0.4 + px * 0.25;
    } else if (pose === 'benefits') {
      targetHeadY = 0.4 + px * 0.25;
    } else if (pose === 'roadmap') {
      targetHeadX = 0.3 - py * 0.15;
    }

    // Clamp head rotations strictly to avoid back-facing
    targetHeadY = THREE.MathUtils.clamp(targetHeadY, -0.65, 0.65);
    targetHeadX = THREE.MathUtils.clamp(targetHeadX, -0.4, 0.3);

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.08);
    }

    // 4. Blinking Eyes logic
    if (!isBlinking.current) {
      if (time - blinkTimer.current > Math.random() * 5 + 3) {
        isBlinking.current = true;
        blinkPhase.current = 0;
        blinkTimer.current = time;
      }
    } else {
      blinkPhase.current += delta;
      if (blinkPhase.current >= blinkDuration) {
        isBlinking.current = false;
      }
    }

    let eyeScaleY = 1.0;
    if (isBlinking.current) {
      const halfBlink = blinkDuration / 2;
      if (blinkPhase.current < halfBlink) {
        eyeScaleY = THREE.MathUtils.lerp(1.0, 0.05, blinkPhase.current / halfBlink);
      } else {
        eyeScaleY = THREE.MathUtils.lerp(0.05, 1.0, (blinkPhase.current - halfBlink) / halfBlink);
      }
    }

    const targetEyeScale = isHovered || isClicked ? 1.25 : 1.0;

    // Slide eyes dynamically to track cursor within the bezel
    const targetLeftEyeX = -0.2 + px * 0.06;
    const targetRightEyeX = 0.2 + px * 0.06;
    const targetEyeY = 0.04 + py * 0.04;

    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(leftEyeRef.current.position.x, targetLeftEyeX, 0.1);
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(leftEyeRef.current.position.y, targetEyeY, 0.1);
      leftEyeRef.current.scale.set(0.13 * targetEyeScale, 0.13 * targetEyeScale * eyeScaleY, 0.13 * targetEyeScale);
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(rightEyeRef.current.position.x, targetRightEyeX, 0.1);
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(rightEyeRef.current.position.y, targetEyeY, 0.1);
      rightEyeRef.current.scale.set(0.13 * targetEyeScale, 0.13 * targetEyeScale * eyeScaleY, 0.13 * targetEyeScale);
    }

    // 5. Rotate the floating planet orb and its satellites
    if (planetOrbRef.current) {
      planetOrbRef.current.rotation.y = time * 0.4;
      planetOrbRef.current.rotation.z = Math.sin(time * 0.5) * 0.15;
    }

    // 6. Sway arm holding the planet gently
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.15 + Math.sin(time * 1.5) * 0.03;
      rightArmRef.current.rotation.y = -0.05 + Math.cos(time * 1.5) * 0.02;
    }

    // Sway the other arm
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.05 + Math.sin(time * 1.5) * 0.03;
    }
  });

  const easeOutElastic = (x: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  };

  return (
    <group ref={mainGroupRef} onClick={onModelClick}>
      {/* 1. HEAD GROUP */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Rounded-Box White Head Shell */}
        <mesh material={whitePlasticMaterial} castShadow receiveShadow scale={[1.15, 0.9, 0.8]}>
          <sphereGeometry args={[0.7, 32, 32]} />
        </mesh>

        {/* Screen Bezel (Black) */}
        <mesh position={[0, 0, 0.09]} scale={[1.02, 0.78, 0.78]} material={darkScreenMaterial} castShadow>
          <sphereGeometry args={[0.66, 32, 32]} />
        </mesh>

        {/* EYES (Spherical glowing dome eyes) */}
        <mesh ref={leftEyeRef} position={[-0.2, 0.04, 0.58]} scale={[0.13, 0.13, 0.13]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={glowingCyanMaterial} attach="material" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.2, 0.04, 0.58]} scale={[0.13, 0.13, 0.13]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={glowingCyanMaterial} attach="material" />
        </mesh>

        {/* SCREEN CORNER BRACKETS [ ] */}
        {/* Top-Left Bracket */}
        <group position={[-0.42, 0.28, 0.52]}>
          <mesh material={glowingCyanMaterial}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
          </mesh>
          <mesh position={[-0.022, -0.022, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.015, 0.06, 0.01]} />
          </mesh>
        </group>

        {/* Top-Right Bracket */}
        <group position={[0.42, 0.28, 0.52]}>
          <mesh material={glowingCyanMaterial}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
          </mesh>
          <mesh position={[0.022, -0.022, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.015, 0.06, 0.01]} />
          </mesh>
        </group>

        {/* Bottom-Left Bracket */}
        <group position={[-0.42, -0.2, 0.52]}>
          <mesh material={glowingCyanMaterial}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
          </mesh>
          <mesh position={[-0.022, 0.022, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.015, 0.06, 0.01]} />
          </mesh>
        </group>

        {/* Bottom-Right Bracket */}
        <group position={[0.42, -0.2, 0.52]}>
          <mesh material={glowingCyanMaterial}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
          </mesh>
          <mesh position={[0.022, 0.022, 0]} material={glowingCyanMaterial}>
            <boxGeometry args={[0.015, 0.06, 0.01]} />
          </mesh>
        </group>

        {/* HEADPHONES / EARS (Metallic light blue) */}
        {/* Left Ear Pad */}
        <group position={[-0.78, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={lightBlueMetallicMaterial} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
          </mesh>
          <mesh position={[0, -0.061, 0]} material={whitePlasticMaterial}>
            <cylinderGeometry args={[0.13, 0.13, 0.02, 32]} />
          </mesh>
        </group>

        {/* Right Ear Pad */}
        <group position={[0.78, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh material={lightBlueMetallicMaterial} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
          </mesh>
          <mesh position={[0, -0.061, 0]} material={whitePlasticMaterial}>
            <cylinderGeometry args={[0.13, 0.13, 0.02, 32]} />
          </mesh>
        </group>

        {/* ANTENNAS (Upward & Outward Pointing Wings directly inside head) */}
        {/* Left Antenna */}
        <group position={[-0.75, 0.25, 0.0]} rotation={[0, 0, 0.45]}>
          <mesh material={lightBlueMetallicMaterial} scale={[0.06, 0.22, 0.06]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        </group>

        {/* Right Antenna */}
        <group position={[0.75, 0.25, 0.0]} rotation={[0, 0, -0.45]}>
          <mesh material={lightBlueMetallicMaterial} scale={[0.06, 0.22, 0.06]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* 2. NECK (Metallic Joint) */}
      <mesh position={[0, 0.58, 0]} material={lightBlueMetallicMaterial}>
        <sphereGeometry args={[0.07, 16, 16]} />
      </mesh>
      <mesh position={[0, 0.52, 0]} material={whitePlasticMaterial} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.06, 16]} />
      </mesh>

      {/* 3. TORSO (White capsule body with light blue bib vest) */}
      <group ref={torsoRef} position={[0, 0, 0]}>
        {/* White base body */}
        <mesh material={whitePlasticMaterial} castShadow scale={[0.9, 1.05, 0.8]}>
          <sphereGeometry args={[0.48, 32, 32]} />
        </mesh>

        {/* Light Blue Vest Bib Plate */}
        <mesh position={[0, 0.18, 0.015]} scale={[0.91, 0.58, 0.81]} material={lightBlueMetallicMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.48, 32, 32]} />
        </mesh>

        {/* Bib Center Button */}
        <mesh position={[0, 0.12, 0.4]} rotation={[Math.PI / 2, 0, 0]} material={glowingCyanMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        </mesh>
      </group>

      {/* 4. ARMS */}
      {/* RIGHT ARM (Holds the Orb, smooth curve design) */}
      <group ref={rightArmRef} position={[-0.48, 0.18, 0.02]}>
        {/* Shoulder Pad */}
        <mesh material={lightBlueMetallicMaterial} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>

        {/* Curved White Arm Tube */}
        <mesh castShadow>
          <tubeGeometry args={[rightArmCurve, 20, 0.065, 8, false]} />
          <primitive object={whitePlasticMaterial} attach="material" />
        </mesh>

        {/* Hand Cuff at the end of the curve */}
        <mesh position={[-0.30, 0.18, 0.14]} rotation={[0.4, 0, -0.8]} material={lightBlueMetallicMaterial} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
        </mesh>

        {/* Floating Planet Orb */}
        <group ref={planetOrbRef} position={[-0.30, 0.42, 0.14]}>
          <mesh material={planetBlueMaterial} castShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0.2, 0]} material={whiteRingMaterial}>
            <torusGeometry args={[0.22, 0.007, 8, 32]} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, -0.3, 0.5]} material={whiteRingMaterial}>
            <torusGeometry args={[0.22, 0.007, 8, 32]} />
          </mesh>
          <mesh position={[0.18, 0.06, -0.05]} material={glowingCyanMaterial}>
            <sphereGeometry args={[0.02, 12, 12]} />
          </mesh>
          <mesh position={[-0.14, -0.1, 0.08]} material={glowingCyanMaterial}>
            <sphereGeometry args={[0.02, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* LEFT ARM (Relaxed Capsule pointing down-and-out) */}
      <group ref={leftArmRef} position={[0.48, 0.18, 0]}>
        {/* Shoulder Pad */}
        <mesh material={lightBlueMetallicMaterial} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>

        {/* Arm Body */}
        <group position={[0.12, -0.15, 0.04]} rotation={[0, 0, -0.3]}>
          <mesh material={whitePlasticMaterial} scale={[0.075, 0.18, 0.075]} castShadow>
            <sphereGeometry args={[1, 16, 16]} />
          </mesh>
          
          {/* Hand Cuff */}
          <mesh position={[0, -0.18, 0]} material={lightBlueMetallicMaterial}>
            <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
export default RobotModel;
