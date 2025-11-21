// components/ToolNexus/ImmersiveHeader.tsx
import { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { 
  ImmersiveHeaderProps, 
  DynamicToolCanvasProps, 
  HeroIntelligencePanelProps,
  LiveMetrics,
  PrimaryAction
} from '../../types/tool-nexus';

const DynamicToolCanvas: React.FC<DynamicToolCanvasProps> = ({
  visualSeed,
  animation,
  colorPalette,
  interactiveElements
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const controlsRef = useRef<OrbitControls>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Create background animation based on type
    createBackgroundAnimation(scene, animation, colorPalette, visualSeed);

    // Add interactive elements
    createInteractiveElements(scene, interactiveElements, colorPalette);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      updateAnimation(scene, animation, Date.now() * 0.001);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [visualSeed, animation, colorPalette, interactiveElements]);

  const createBackgroundAnimation = (
    scene: THREE.Scene,
    animationType: string,
    colors: string[],
    seed: string
  ) => {
    switch (animationType) {
      case 'neural_network':
        createNeuralNetwork(scene, colors, seed);
        break;
      case 'color_spectrum':
        createColorSpectrum(scene, colors, seed);
        break;
      case 'code_streams':
        createCodeStreams(scene, colors, seed);
        break;
      case 'shape_morphing':
        createShapeMorphing(scene, colors, seed);
        break;
    }
  };

  const createNeuralNetwork = (scene: THREE.Scene, colors: string[], seed: string) => {
    // Create neural network visualization
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    
    // Generate nodes
    const nodeCount = 50;
    const random = seededRandom(seed);
    
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.05, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8
      });
      const node = new THREE.Mesh(geometry, material);
      
      node.position.set(
        (random() - 0.5) * 8,
        (random() - 0.5) * 6,
        (random() - 0.5) * 4
      );
      
      node.userData = {
        originalPosition: node.position.clone(),
        pulsePhase: random() * Math.PI * 2,
        pulseSpeed: 0.5 + random() * 1.5
      };
      
      nodes.push(node);
      scene.add(node);
    }
    
    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      const connectionCount = Math.floor(random() * 3) + 1;
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(random() * nodeCount);
        if (targetIndex !== i) {
          const material = new THREE.LineBasicMaterial({
            color: colors[0],
            transparent: true,
            opacity: 0.3
          });
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[targetIndex].position
          ]);
          const line = new THREE.Line(geometry, material);
          connections.push(line);
          scene.add(line);
        }
      }
    }
    
    // Store references for animation
    scene.userData.neuralNetwork = { nodes, connections };
  };

  const createColorSpectrum = (scene: THREE.Scene, colors: string[], seed: string) => {
    // Create flowing color spectrum waves
    const waves: THREE.Mesh[] = [];
    const random = seededRandom(seed);
    
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.PlaneGeometry(12, 8, 32, 24);
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        wireframe: false
      });
      
      const wave = new THREE.Mesh(geometry, material);
      wave.position.z = i * 0.5 - 2;
      wave.rotation.x = Math.PI / 4;
      
      wave.userData = {
        waveSpeed: 0.5 + random() * 1,
        waveAmplitude: 0.2 + random() * 0.3,
        phase: random() * Math.PI * 2
      };
      
      waves.push(wave);
      scene.add(wave);
    }
    
    scene.userData.colorSpectrum = waves;
  };

  const createCodeStreams = (scene: THREE.Scene, colors: string[], seed: string) => {
    // Create flowing code streams
    const streams: THREE.Group[] = [];
    const random = seededRandom(seed);
    
    for (let i = 0; i < 8; i++) {
      const stream = new THREE.Group();
      
      // Create code blocks
      const blockCount = 20;
      for (let j = 0; j < blockCount; j++) {
        const geometry = new THREE.BoxGeometry(0.1, 0.15, 0.05);
        const material = new THREE.MeshPhongMaterial({
          color: colors[j % colors.length],
          transparent: true,
          opacity: 0.7
        });
        
        const block = new THREE.Mesh(geometry, material);
        block.position.set(
          (random() - 0.5) * 10,
          j * 0.3 - 3,
          (random() - 0.5) * 2
        );
        
        stream.add(block);
      }
      
      stream.userData = {
        flowSpeed: 0.2 + random() * 0.5,
        flowDirection: new THREE.Vector3(
          (random() - 0.5) * 0.1,
          -0.5,
          (random() - 0.5) * 0.1
        )
      };
      
      streams.push(stream);
      scene.add(stream);
    }
    
    scene.userData.codeStreams = streams;
  };

  const createShapeMorphing = (scene: THREE.Scene, colors: string[], seed: string) => {
    // Create morphing shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.ConeGeometry(1, 2, 8),
      new THREE.TorusGeometry(1, 0.3, 8, 16)
    ];
    
    const random = seededRandom(seed);
    
    for (let i = 0; i < 6; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6,
        wireframe: random() > 0.5
      });
      
      const shape = new THREE.Mesh(geometries[i % geometries.length], material);
      shape.position.set(
        (random() - 0.5) * 6,
        (random() - 0.5) * 4,
        (random() - 0.5) * 3
      );
      
      shape.userData = {
        morphSpeed: 0.3 + random() * 0.7,
        morphPhase: random() * Math.PI * 2,
        rotationSpeed: {
          x: (random() - 0.5) * 0.02,
          y: (random() - 0.5) * 0.02,
          z: (random() - 0.5) * 0.02
        }
      };
      
      shapes.push(shape);
      scene.add(shape);
    }
    
    scene.userData.shapeMorphing = shapes;
  };

  const createInteractiveElements = (scene: THREE.Scene, elements: string[], colors: string[]) => {
    // Add floating interactive elements based on tool features
    elements.forEach((element, index) => {
      const geometry = new THREE.PlaneGeometry(0.3, 0.3);
      const material = new THREE.MeshBasicMaterial({
        color: colors[index % colors.length],
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const elementMesh = new THREE.Mesh(geometry, material);
      elementMesh.position.set(
        Math.cos(index * 0.5) * 3,
        Math.sin(index * 0.3) * 2,
        Math.sin(index * 0.7) * 1
      );
      
      elementMesh.userData = {
        elementType: element,
        orbitRadius: 2 + index * 0.5,
        orbitSpeed: 0.5 + index * 0.1,
        orbitPhase: index * 0.5
      };
      
      scene.add(elementMesh);
    });
  };

  const updateAnimation = (scene: THREE.Scene, animationType: string, time: number) => {
    switch (animationType) {
      case 'neural_network':
        updateNeuralNetwork(scene, time);
        break;
      case 'color_spectrum':
        updateColorSpectrum(scene, time);
        break;
      case 'code_streams':
        updateCodeStreams(scene, time);
        break;
      case 'shape_morphing':
        updateShapeMorphing(scene, time);
        break;
    }
    
    // Update interactive elements
    scene.traverse((child) => {
      if (child.userData.elementType) {
        const radius = child.userData.orbitRadius;
        const speed = child.userData.orbitSpeed;
        const phase = child.userData.orbitPhase;
        
        child.position.x = Math.cos(time * speed + phase) * radius;
        child.position.y = Math.sin(time * speed * 0.7 + phase) * radius * 0.5;
        child.rotation.z = time * 0.5;
      }
    });
  };

  const updateNeuralNetwork = (scene: THREE.Scene, time: number) => {
    const network = scene.userData.neuralNetwork;
    if (!network) return;
    
    network.nodes.forEach((node: THREE.Mesh) => {
      const userData = node.userData;
      const pulse = Math.sin(time * userData.pulseSpeed + userData.pulsePhase) * 0.1 + 1;
      node.scale.setScalar(pulse);
      (node.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2 + Math.sin(time * userData.pulseSpeed + userData.pulsePhase) * 0.3;
    });
  };

  const updateColorSpectrum = (scene: THREE.Scene, time: number) => {
    const waves = scene.userData.colorSpectrum;
    if (!waves) return;
    
    waves.forEach((wave: THREE.Mesh, index: number) => {
      const userData = wave.userData;
      const positions = wave.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveHeight = Math.sin(x * 0.5 + time * userData.waveSpeed + userData.phase) * userData.waveAmplitude;
        positions.setY(i, y + waveHeight);
      }
      
      positions.needsUpdate = true;
    });
  };

  const updateCodeStreams = (scene: THREE.Scene, time: number) => {
    const streams = scene.userData.codeStreams;
    if (!streams) return;
    
    streams.forEach((stream: THREE.Group) => {
      const userData = stream.userData;
      stream.position.add(userData.flowDirection.clone().multiplyScalar(0.01));
      
      // Reset position if stream goes too far
      if (stream.position.y < -5) {
        stream.position.y = 5;
      }
      
      stream.rotation.y = time * 0.1;
    });
  };

  const updateShapeMorphing = (scene: THREE.Scene, time: number) => {
    const shapes = scene.userData.shapeMorphing;
    if (!shapes) return;
    
    shapes.forEach((shape: THREE.Mesh) => {
      const userData = shape.userData;
      
      // Morph scale
      const morphScale = Math.sin(time * userData.morphSpeed + userData.morphPhase) * 0.3 + 1;
      shape.scale.setScalar(morphScale);
      
      // Rotation
      shape.rotation.x += userData.rotationSpeed.x;
      shape.rotation.y += userData.rotationSpeed.y;
      shape.rotation.z += userData.rotationSpeed.z;
    });
  };

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

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))' }}
    />
  );
};

const HeroIntelligencePanel: React.FC<HeroIntelligencePanelProps> = ({
  tool,
  stats,
  actions
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  return (
    <div className="relative z-20 max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Tool Crystal */}
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">AI</span>
              </div>
            </div>
          </div>

          {/* Vital Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">4.8★</div>
              <div className="text-sm text-white/70">2.4k reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">500K+</div>
              <div className="text-sm text-white/70">active users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2020</div>
              <div className="text-sm text-white/70">founded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stats.current_visitors}
              </div>
              <div className="text-sm text-white/70">visiting now</div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
              ● All Systems Operational
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
              🔥 Trending
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
              v3.2 Released
            </span>
          </div>

          {/* Action Matrix */}
          <div className="flex flex-wrap justify-center gap-3">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  setSelectedAction(action.id);
                  action.action();
                }}
                disabled={action.loading}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  action.type === 'primary'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                    : action.type === 'secondary'
                    ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                } ${action.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {action.loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {action.icon && <span>{action.icon}</span>}
                    {action.label}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Expandable Details */}
          <div className="mt-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              {isExpanded ? 'Hide Details ▲' : 'Show More Details ▼'}
            </button>
            
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-white/20 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Performance Metrics</h4>
                    <div className="space-y-1 text-white/70">
                      <div>Response Time: {stats.server_response_time}ms</div>
                      <div>Uptime: {stats.uptime_percentage}%</div>
                      <div>API Calls/min: {stats.api_calls_per_minute}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Recent Activity</h4>
                    <div className="space-y-1 text-white/70">
                      <div>Trial Starters Today: {stats.trial_starters_today}</div>
                      <div>Active Users: {stats.active_users}</div>
                      <div>Last Updated: Just now</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickInsightBar: React.FC<{ 
  metrics: LiveMetrics;
  activity: any[];
}> = ({ metrics, activity }) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const insights = [
    `${metrics.current_visitors} people visiting now`,
    `${metrics.trial_starters_today} started trial today`,
    "Startup XYZ just switched to this tool",
    "Version 3.2 released with new features",
    "Trending on Twitter - 2.3k mentions",
    "Github stars +127 this week"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-green-400 text-sm">● LIVE</span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-fade-in">
              <span className="text-white/80 text-sm">{insights[currentInsight]}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {insights.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-all ${
                  index === currentInsight ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImmersiveHeader: React.FC<ImmersiveHeaderProps> = ({
  immersiveData,
  tool,
  onAction
}) => {
  const [stats, setStats] = useState<LiveMetrics>({
    current_visitors: 47,
    trial_starters_today: 12,
    active_users: 500000,
    api_calls_per_minute: 1250,
    server_response_time: 120,
    uptime_percentage: 99.9
  });

  const primaryActions: PrimaryAction[] = [
    {
      id: 'visit_website',
      label: 'Visit Website',
      type: 'primary',
      action: () => onAction('visit_website'),
      icon: '🌐'
    },
    {
      id: 'start_trial',
      label: 'Start Free Trial',
      type: 'secondary',
      action: () => onAction('start_trial'),
      icon: '🚀'
    },
    {
      id: 'add_to_sanctuary',
      label: 'Add to Sanctuary',
      type: 'secondary',
      action: () => onAction('add_to_sanctuary'),
      icon: '✨'
    },
    {
      id: 'compare',
      label: 'Compare',
      type: 'tertiary',
      action: () => onAction('compare'),
      icon: '⚖️'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        current_visitors: prev.current_visitors + Math.floor(Math.random() * 5) - 2,
        trial_starters_today: prev.trial_starters_today + (Math.random() > 0.7 ? 1 : 0),
        server_response_time: 100 + Math.floor(Math.random() * 50)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Dynamic Tool Canvas Background */}
      <DynamicToolCanvas
        visualSeed={immersiveData.visual_seed}
        animation={immersiveData.background_animation}
        colorPalette={immersiveData.color_palette}
        interactiveElements={immersiveData.interactive_elements}
      />

      {/* Tool Aura Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${immersiveData.tool_aura.primary_color}20 0%, transparent 70%)`,
        }}
      />

      {/* Hero Intelligence Panel */}
      <HeroIntelligencePanel
        tool={tool}
        stats={stats}
        actions={primaryActions}
      />

      {/* Quick Insight Bar */}
      <div className="absolute bottom-8 left-0 right-0">
        <QuickInsightBar
          metrics={stats}
          activity={tool.real_time_data.recent_activity}
        />
      </div>
    </div>
  );
};

export default ImmersiveHeader;
