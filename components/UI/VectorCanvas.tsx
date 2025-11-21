import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface VectorCanvasProps {
  children?: React.ReactNode;
  config?: {
    fov?: number;
    position?: [number, number, number];
    autoRotate?: boolean;
    rotationSpeed?: number;
    backgroundColor?: string;
  };
  className?: string;
}

const Scene = ({
  config = {},
  children
}: {
  config: VectorCanvasProps['config'];
  children: React.ReactNode;
}) => {
  const { camera } = useThree();
  const sceneRef = useRef<THREE.Scene>(null);
  const { fov = 50, position = [0, 0, 5], autoRotate = true, rotationSpeed = 0.5 } = config;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.position.set(...(position as [number, number, number]));
      camera.updateProjectionMatrix();
    }
  }, [camera, fov, position]);

  useFrame(({ clock }) => {
    if (autoRotate && sceneRef.current) {
      sceneRef.current.rotation.y = clock.getElapsedTime() * (rotationSpeed * 0.1);
    }
  });

  return (
    <scene ref={sceneRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {children}
    </scene>
  );
};

export const VectorCanvas: React.FC<VectorCanvasProps> = ({
  children,
  config = {},
  className = ''
}) => {
  const { backgroundColor = '#000000' } = config;

  return (
    <div className={`w-full h-full ${className}`} style={{ backgroundColor }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: config.position || [0, 0, 5], fov: config.fov || 50 }}
        dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
      >
        <Scene config={config}>
          {children || (
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 16]} />
              <meshStandardMaterial
                color="#0ff"
                roughness={0.1}
                metalness={0.8}
                wireframe
              />
            </mesh>
          )}
        </Scene>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={config.autoRotate}
          autoRotateSpeed={config.rotationSpeed || 0.5}
        />
      </Canvas>
    </div>
  );
};

export default VectorCanvas;
