import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { RobotModel } from './RobotModel';
import { FloatingParticles } from './FloatingParticles';

interface RobotCanvasProps {
  pose: 'idle' | 'wave' | 'programs' | 'benefits' | 'roadmap' | 'footer';
  onRobotClick: () => void;
  mini?: boolean;
  blinkTrigger?: number;
  isParentHovered?: boolean;
  globalMouse: { x: number; y: number };
}

export const RobotCanvas: React.FC<RobotCanvasProps> = ({ 
  pose, 
  onRobotClick, 
  mini = false,
  blinkTrigger = 0,
  isParentHovered = false,
  globalMouse
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    onRobotClick();
    
    // Wave duration
    setTimeout(() => {
      setIsClicked(false);
    }, 1800);
  };

  // Responsive settings based on screen width
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  const scale = mini ? 0.62 : isMobile ? 1.1 : isTablet ? 1.4 : 1.6;
  const positionY = mini ? -0.32 : isMobile ? -0.55 : isTablet ? -0.65 : -0.7;
  const cameraZ = mini ? 3.3 : isMobile ? 4.0 : isTablet ? 4.2 : 4.4;
  const cameraY = mini ? 0.16 : isMobile ? 0.1 : isTablet ? 0.15 : 0.2;
  const shadowY = mini ? -0.66 : isMobile ? -1.2 : isTablet ? -1.4 : -1.55;

  return (
    <div 
      className={`robot-canvas-wrapper ${mini ? 'mini' : ''}`}
      style={{
        width: '100%',
        height: mini ? '100%' : isMobile ? '380px' : isTablet ? '450px' : '520px',
        position: 'relative',
        cursor: isHovered ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background radial glow */}
      {!mini && <div className="robot-bg-glow" />}

      <Suspense fallback={
        <div className="robot-loader">
          {!mini && <div className="spinner"></div>}
          <span>{mini ? '...' : 'Activating AI Assistant...'}</span>
        </div>
      }>
        <Canvas
          shadows
          camera={{ position: [0, cameraY, cameraZ], fov: mini ? 40 : 45 }}
          style={{ 
            width: mini ? '180px' : '100%', 
            height: mini ? '180px' : '100%', 
            position: mini ? 'absolute' : 'relative',
            top: mini ? '-25px' : '0',
            left: mini ? '-25px' : '0',
            background: 'transparent', 
            pointerEvents: 'none' 
          }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          {/* Ambient light for base visibility */}
          <ambientLight intensity={0.5} />

          {/* Directional light to cast shadows */}
          <directionalLight 
            position={[4, 8, 4]} 
            intensity={1.8} 
            castShadow
            shadow-mapSize={mini ? [512, 512] : [1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Premium colored rim/fill lights */}
          <pointLight position={[-4, 2, 2]} color="#06b6d4" intensity={1.5} distance={10} />
          <pointLight position={[3, 3, -2]} color="#a855f7" intensity={1.2} distance={8} />

          {/* Sparkles / Floating digital dust */}
          {!mini && <FloatingParticles />}

          <group scale={scale} position={[0, positionY, 0]}>
            <RobotModel 
              pose={pose} 
              isHovered={isHovered || isParentHovered} 
              isClicked={isClicked}
              onModelClick={handleClick}
              blinkTrigger={blinkTrigger}
              globalMouse={globalMouse}
            />
          </group>

          {/* Soft contact shadows underneath the floating robot */}
          <ContactShadows 
            position={[0, shadowY, 0]} 
            opacity={0.3} 
            scale={mini ? 1.8 : 4} 
            blur={2.4} 
            far={1.4} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
export default RobotCanvas;
