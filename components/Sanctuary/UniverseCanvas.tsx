// components/Sanctuary/UniverseCanvas.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFavorites } from '../../hooks/useFavorites';
import { tools } from '../../data/tools';

interface ToolOrbData {
  id: string;
  tool: any;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  pulseSpeed: number;
  glowIntensity: number;
  category: string;
  gravityWell: string;
}

interface GravityWellData {
  id: string;
  type: string;
  position: THREE.Vector3;
  radius: number;
  strength: number;
  color: string;
}

export default function UniverseCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const controlsRef = useRef<OrbitControls>();
  const frameRef = useRef<number>();
  
  const { favorites } = useFavorites();
  const [toolOrbs, setToolOrbs] = useState<ToolOrbData[]>([]);
  const [gravityWells, setGravityWells] = useState<GravityWellData[]>([]);
  const [universeSeed, setUniverseSeed] = useState<string>('');
  const [collectionMood, setCollectionMood] = useState<'productive' | 'creative' | 'research'>('productive');

  // Generate unique universe seed based on user's collection
  const generateUniverseSeed = useCallback(() => {
    const favoriteIds = favorites.sort().join('-');
    const seed = favoriteIds.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
    return seed;
  }, [favorites]);

  // Initialize Three.js scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000814, 0.0008);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 200;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Create generative nebula background
    createNebula(scene, generateUniverseSeed());

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [generateUniverseSeed]);

  // Create generative nebula based on seed
  const createNebula = (scene: THREE.Scene, seed: string) => {
    const random = seededRandom(seed);
    
    // Create nebula particles
    const particleCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create nebula cloud formation
      const theta = random() * Math.PI * 2;
      const phi = random() * Math.PI;
      const radius = 30 + random() * 50;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Color based on mood
      const moodColors = {
        productive: [0.3, 0.6, 1.0],    // Blue tones
        creative: [1.0, 0.3, 0.8],        // Magenta tones
        research: [0.2, 0.8, 0.9]        // Cyan tones
      };
      
      const [r, g, b] = moodColors[collectionMood];
      colors[i] = r * (0.3 + random() * 0.7);
      colors[i + 1] = g * (0.3 + random() * 0.7);
      colors[i + 2] = b * (0.3 + random() * 0.7);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const nebula = new THREE.Points(geometry, material);
    scene.add(nebula);
  };

  // Seeded random number generator
  const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash = hash & hash;
    }
    return () => {
      hash = ((hash << 5) - hash) & 0xffffffff;
      return (hash >>> 0) / 0xffffffff;
    };
  };

  // Initialize tool orbs from favorites
  const initializeToolOrbs = useCallback(() => {
    const orbs: ToolOrbData[] = [];
    const wells: GravityWellData[] = [];
    const random = seededRandom(universeSeed);

    // Create gravity wells for categories
    const categories = ['AI Tools', 'Design', 'Development', 'Marketing', 'Productivity'];
    categories.forEach((category, index) => {
      const angle = (index / categories.length) * Math.PI * 2;
      const radius = 25;
      
      wells.push({
        id: category.toLowerCase().replace(' ', '_'),
        type: 'category',
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          Math.sin(angle) * radius * 0.3
        ),
        radius: 8,
        strength: 0.5,
        color: getCategoryColor(category)
      });
    });

    // Create tool orbs
    favorites.forEach((favId, index) => {
      const tool = tools.find(t => t && t.id === favId);
      if (!tool) return;

      const category = tool.category;
      const well = wells.find(w => w.type === 'category' && w.id === category.toLowerCase().replace(' ', '_'));
      
      if (well) {
        // Position orb near its gravity well
        const angle = random() * Math.PI * 2;
        const distance = random() * well.radius;
        
        orbs.push({
          id: tool.id,
          tool,
          position: new THREE.Vector3(
            well.position.x + Math.cos(angle) * distance,
            well.position.y + Math.sin(angle) * distance,
            well.position.z + (random() - 0.5) * 4
          ),
          velocity: new THREE.Vector3(
            (random() - 0.5) * 0.01,
            (random() - 0.5) * 0.01,
            (random() - 0.5) * 0.01
          ),
          color: getCategoryColor(category),
          pulseSpeed: 0.5 + random() * 1.5,
          glowIntensity: 0.6 + random() * 0.4,
          category,
          gravityWell: well.id
        });
      }
    });

    setToolOrbs(orbs);
    setGravityWells(wells);
  }, [favorites, universeSeed]);

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'AI Tools': '#00ffff',
      'Design': '#ff00ff',
      'Development': '#ffd700',
      'Marketing': '#ff6b6b',
      'Productivity': '#4ecdc4'
    };
    return colors[category] || '#ffffff';
  };

  // Create visual orb for tool
  const createToolOrb = (orbData: ToolOrbData): THREE.Mesh => {
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: orbData.color,
      emissive: orbData.color,
      emissiveIntensity: orbData.glowIntensity,
      transparent: true,
      opacity: 0.8
    });

    const orb = new THREE.Mesh(geometry, material);
    orb.position.copy(orbData.position);
    orb.userData = orbData;
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(2, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: orbData.color,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    orb.add(glow);

    return orb;
  };

  // Create gravity well visualization
  const createGravityWell = (wellData: GravityWellData): THREE.Group => {
    const group = new THREE.Group();
    
    // Create well ring
    const ringGeometry = new THREE.RingGeometry(wellData.radius - 0.5, wellData.radius + 0.5, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: wellData.color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Add center point
    const centerGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: wellData.color,
      transparent: true,
      opacity: 0.8
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    group.add(center);

    group.position.copy(wellData.position);
    return group;
  };

  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !controlsRef.current) return;

    // Update controls
    controlsRef.current.update();

    // Pulse tool orbs
    const time = Date.now() * 0.001;
    sceneRef.current.traverse((child) => {
      if (child.userData && child.userData.pulseSpeed) {
        const scale = 1 + Math.sin(time * child.userData.pulseSpeed) * 0.1;
        child.scale.setScalar(scale);
      }
    });

    // Apply gravity physics
    toolOrbs.forEach((orb) => {
      const well = gravityWells.find(w => w.id === orb.gravityWell);
      if (well) {
        const direction = well.position.clone().sub(orb.position);
        const distance = direction.length();
        
        if (distance > 0.1) {
          const force = direction.normalize().multiplyScalar(well.strength * 0.001);
          orb.velocity.add(force);
          orb.velocity.multiplyScalar(0.99); // Damping
          orb.position.add(orb.velocity);
        }
      }
    });

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [toolOrbs, gravityWells]);

  // Initialize scene and start animation
  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  // Update universe when favorites change
  useEffect(() => {
    const seed = generateUniverseSeed();
    setUniverseSeed(seed);
  }, [favorites, generateUniverseSeed]);

  // Initialize orbs when seed is set
  useEffect(() => {
    if (universeSeed && sceneRef.current) {
      initializeToolOrbs();
    }
  }, [universeSeed, initializeToolOrbs]);

  // Add orbs to scene when created
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear existing orbs and wells
    const toRemove: THREE.Object3D[] = [];
    sceneRef.current.traverse((child) => {
      if (child.userData && (child.userData as any).type === 'gravity_well') {
        toRemove.push(child);
      }
    });
    toRemove.forEach(child => sceneRef.current!.remove(child));

    // Add gravity wells
    gravityWells.forEach(well => {
      const wellVisual = createGravityWell(well);
      wellVisual.userData = { type: 'gravity_well', data: well };
      sceneRef.current!.add(wellVisual);
    });

    // Add tool orbs
    toolOrbs.forEach(orb => {
      const orbVisual = createToolOrb(orb);
      sceneRef.current!.add(orbVisual);
    });
  }, [toolOrbs, gravityWells]);

  // Start animation loop
  useEffect(() => {
    animate();
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate]);

  return (
    <div ref={mountRef} className="w-full h-full absolute inset-0" />
  );
}
