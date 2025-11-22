import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore - maath/random doesn't have proper types
import * as random from 'maath/random/dist/maath-random.esm';

// Neural Background Component
function NeuralBackground({ theme }: { theme: string }) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const colors = useMemo(() => {
    switch(theme) {
      case 'ai':
        return ['#00ffff', '#0080ff', '#ffffff'];
      case 'cybersecurity':
        return ['#00ff00', '#ffff00', '#ff00ff'];
      case 'development':
        return ['#ff6b6b', '#4ecdc4', '#45b7d1'];
      default:
        return ['#8b5cf6', '#3b82f6', '#06b6d4'];
    }
  }, [theme]);

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color={colors[0]} 
        size={0.005} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </Points>
  );
}

// Knowledge Node Data Structure
interface KnowledgeNode {
  id: string;
  title: string;
  excerpt: string;
  generativeSeed: string;
  theme: 'ai' | 'cybersecurity' | 'development' | 'analytics';
  content: {
    founderInstance: string;
    developerInstance: string;
    audioNarrationUrl: string;
  };
  semanticEmbedding: number[];
  dynamicTags: string[];
  linkedEntities: Array<{
    type: 'tool' | 'category';
    id: string;
    name: string;
  }>;
  engagementPulse: number;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  publishedAt: string;
}

// Knowledge Nodes Data
const knowledgeNodes: KnowledgeNode[] = [
  {
    id: 'ai-automation-business',
    title: 'AI Automation for Business: Complete Guide to Scaling Operations',
    excerpt: 'Business automation has evolved from simple rule-based systems to sophisticated AI-powered workflows that can learn, adapt, and make decisions.',
    generativeSeed: 'ai-automation-business',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: Understanding how AI automation can transform business operations and reduce costs by up to 50%...',
      developerInstance: 'For developers: Implementation strategies for AI-powered business automation systems...',
      audioNarrationUrl: '/audio/ai-automation-business.mp3'
    },
    semanticEmbedding: [0.23, -0.45, 0.67, 0.12],
    dynamicTags: ['AI', 'Business', 'Automation', 'Scaling'],
    linkedEntities: [
      { type: 'tool', id: 'tool_001', name: 'Zapier' },
      { type: 'category', id: 'cat_001', name: 'Business Automation' }
    ],
    engagementPulse: 0.92,
    author: {
      name: 'AI Vault Team',
      avatar: '/avatars/ai-vault.jpg'
    },
    readTime: '8 min read',
    publishedAt: '2024-11-20'
  },
  {
    id: 'ai-design-tools-2024',
    title: 'AI Design Tools 2024: Complete Guide for Creative Professionals',
    excerpt: 'The world of design has been revolutionized by artificial intelligence. From graphic design to 3D modeling, AI tools are empowering creative professionals.',
    generativeSeed: 'ai-design-tools-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How AI design tools can reduce creative costs and accelerate product development...',
      developerInstance: 'For developers: Technical implementation of AI-powered design workflows...',
      audioNarrationUrl: '/audio/ai-design-tools-2024.mp3'
    },
    semanticEmbedding: [0.34, -0.23, 0.78, 0.15],
    dynamicTags: ['AI', 'Design', 'Creative', 'Tools'],
    linkedEntities: [
      { type: 'tool', id: 'tool_002', name: 'Midjourney' },
      { type: 'category', id: 'cat_002', name: 'Design Tools' }
    ],
    engagementPulse: 0.89,
    author: {
      name: 'Design Team',
      avatar: '/avatars/design-team.jpg'
    },
    readTime: '6 min read',
    publishedAt: '2024-11-19'
  },
  {
    id: 'ai-development-tools-2024',
    title: 'AI Development Tools 2024: Essential Guide for Developers',
    excerpt: 'AI development tools are revolutionizing how developers write, test, and deploy code. From intelligent code completion to automated debugging.',
    generativeSeed: 'ai-development-tools-2024',
    theme: 'development',
    content: {
      founderInstance: 'For founders: How AI development tools can accelerate product development and reduce engineering costs...',
      developerInstance: 'For developers: Deep dive into AI-assisted coding workflows and best practices...',
      audioNarrationUrl: '/audio/ai-development-tools-2024.mp3'
    },
    semanticEmbedding: [0.45, -0.12, 0.89, 0.23],
    dynamicTags: ['AI', 'Development', 'Code', 'Tools'],
    linkedEntities: [
      { type: 'tool', id: 'tool_003', name: 'GitHub Copilot' },
      { type: 'category', id: 'cat_003', name: 'Development Tools' }
    ],
    engagementPulse: 0.94,
    author: {
      name: 'Dev Team',
      avatar: '/avatars/dev-team.jpg'
    },
    readTime: '7 min read',
    publishedAt: '2024-11-18'
  },
  {
    id: 'ai-marketing-tools-2024',
    title: 'AI Marketing Tools 2024: Complete Marketing Automation Guide',
    excerpt: 'Marketing has been transformed by artificial intelligence. From content creation to campaign optimization, AI tools are helping marketers achieve better results.',
    generativeSeed: 'ai-marketing-tools-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How AI marketing tools can improve ROI and automate campaign management...',
      developerInstance: 'For developers: Technical implementation of AI-powered marketing systems...',
      audioNarrationUrl: '/audio/ai-marketing-tools-2024.mp3'
    },
    semanticEmbedding: [0.56, -0.34, 0.91, 0.28],
    dynamicTags: ['AI', 'Marketing', 'Automation', 'Campaigns'],
    linkedEntities: [
      { type: 'tool', id: 'tool_004', name: 'Jasper AI' },
      { type: 'category', id: 'cat_004', name: 'Marketing Tools' }
    ],
    engagementPulse: 0.87,
    author: {
      name: 'Marketing Team',
      avatar: '/avatars/marketing-team.jpg'
    },
    readTime: '6 min read',
    publishedAt: '2024-11-17'
  },
  {
    id: 'ai-productivity-tools-2024',
    title: 'AI Productivity Tools 2024: Ultimate Guide to Getting More Done',
    excerpt: 'AI productivity tools are transforming how we work, learn, and manage our daily tasks. From smart scheduling to automated workflows.',
    generativeSeed: 'ai-productivity-tools-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How AI productivity tools can improve team efficiency and reduce operational costs...',
      developerInstance: 'For developers: Building AI-powered productivity applications and workflows...',
      audioNarrationUrl: '/audio/ai-productivity-tools-2024.mp3'
    },
    semanticEmbedding: [0.67, -0.45, 0.82, 0.19],
    dynamicTags: ['AI', 'Productivity', 'Workflow', 'Automation'],
    linkedEntities: [
      { type: 'tool', id: 'tool_005', name: 'Notion AI' },
      { type: 'category', id: 'cat_005', name: 'Productivity Tools' }
    ],
    engagementPulse: 0.85,
    author: {
      name: 'Productivity Team',
      avatar: '/avatars/productivity-team.jpg'
    },
    readTime: '5 min read',
    publishedAt: '2024-11-16'
  },
  {
    id: 'ai-tools-comparison-2024',
    title: 'AI Tools Comparison 2024: Best AI Software for Every Need',
    excerpt: 'With hundreds of AI tools available, choosing the right ones for your needs can be overwhelming. This comprehensive comparison guide helps you make informed decisions.',
    generativeSeed: 'ai-tools-comparison-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How to choose the right AI tools for your business needs and budget...',
      developerInstance: 'For developers: Technical comparison of AI tools and integration strategies...',
      audioNarrationUrl: '/audio/ai-tools-comparison-2024.mp3'
    },
    semanticEmbedding: [0.78, -0.56, 0.73, 0.31],
    dynamicTags: ['AI', 'Comparison', 'Tools', 'Reviews'],
    linkedEntities: [
      { type: 'tool', id: 'tool_006', name: 'ChatGPT' },
      { type: 'category', id: 'cat_006', name: 'Tool Comparison' }
    ],
    engagementPulse: 0.91,
    author: {
      name: 'Review Team',
      avatar: '/avatars/review-team.jpg'
    },
    readTime: '10 min read',
    publishedAt: '2024-11-15'
  },
  {
    id: 'future-of-artificial-intelligence',
    title: 'The Future of Artificial Intelligence: Trends and Predictions',
    excerpt: 'Artificial intelligence is evolving at an unprecedented pace. What does the future hold for AI technology and its impact on society, business, and daily life?',
    generativeSeed: 'future-of-artificial-intelligence',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How future AI trends will impact business strategy and investment decisions...',
      developerInstance: 'For developers: Preparing for the next generation of AI technologies and development paradigms...',
      audioNarrationUrl: '/audio/future-of-artificial-intelligence.mp3'
    },
    semanticEmbedding: [0.89, -0.67, 0.64, 0.42],
    dynamicTags: ['AI', 'Future', 'Trends', 'Predictions'],
    linkedEntities: [
      { type: 'tool', id: 'tool_007', name: 'GPT-5' },
      { type: 'category', id: 'cat_007', name: 'Future Tech' }
    ],
    engagementPulse: 0.93,
    author: {
      name: 'Future Tech Team',
      avatar: '/avatars/future-tech.jpg'
    },
    readTime: '8 min read',
    publishedAt: '2024-11-14'
  },
  {
    id: 'machine-learning-beginners-guide',
    title: 'Machine Learning for Beginners: Complete Getting Started Guide',
    excerpt: 'Machine learning can seem intimidating, but it\'s more accessible than ever. This guide breaks down the fundamentals and helps you start your ML journey.',
    generativeSeed: 'machine-learning-beginners-guide',
    theme: 'development',
    content: {
      founderInstance: 'For founders: Understanding machine learning basics for business decision-making...',
      developerInstance: 'For developers: Getting started with ML development and practical implementations...',
      audioNarrationUrl: '/audio/machine-learning-beginners-guide.mp3'
    },
    semanticEmbedding: [0.91, -0.78, 0.56, 0.38],
    dynamicTags: ['ML', 'Beginners', 'Guide', 'Tutorial'],
    linkedEntities: [
      { type: 'tool', id: 'tool_008', name: 'TensorFlow' },
      { type: 'category', id: 'cat_008', name: 'Machine Learning' }
    ],
    engagementPulse: 0.88,
    author: {
      name: 'ML Education Team',
      avatar: '/avatars/ml-education.jpg'
    },
    readTime: '7 min read',
    publishedAt: '2024-11-13'
  },
  {
    id: 'top-10-ai-tools-content-creation-2024',
    title: 'Top 10 AI Tools for Content Creation in 2024',
    excerpt: 'The landscape of content creation has been revolutionized by artificial intelligence. From writing assistants to video generators, AI tools are empowering creators.',
    generativeSeed: 'top-10-ai-tools-content-creation-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: How AI content creation tools can scale content production and reduce costs...',
      developerInstance: 'For developers: Building AI-powered content creation systems and workflows...',
      audioNarrationUrl: '/audio/top-10-ai-tools-content-creation-2024.mp3'
    },
    semanticEmbedding: [0.72, -0.89, 0.45, 0.26],
    dynamicTags: ['AI', 'Content', 'Creation', 'Tools'],
    linkedEntities: [
      { type: 'tool', id: 'tool_009', name: 'Copy.ai' },
      { type: 'category', id: 'cat_009', name: 'Content Creation' }
    ],
    engagementPulse: 0.90,
    author: {
      name: 'AI Vault Team',
      avatar: '/avatars/ai-vault.jpg'
    },
    readTime: '5 min read',
    publishedAt: '2024-11-12'
  },
  {
    id: 'ai-transforming-software-development',
    title: 'How AI is Transforming Software Development',
    excerpt: 'Artificial intelligence is fundamentally changing how software is developed, from code generation to testing and deployment.',
    generativeSeed: 'ai-transforming-software-development',
    theme: 'development',
    content: {
      founderInstance: 'For founders: How AI development tools can accelerate product development and reduce costs...',
      developerInstance: 'For developers: Deep dive into AI-assisted coding workflows and best practices...',
      audioNarrationUrl: '/audio/ai-transforming-software-development.mp3'
    },
    semanticEmbedding: [0.83, -0.91, 0.34, 0.29],
    dynamicTags: ['AI', 'Development', 'Software', 'Transformation'],
    linkedEntities: [
      { type: 'tool', id: 'tool_010', name: 'GitHub Copilot' },
      { type: 'category', id: 'cat_010', name: 'Development' }
    ],
    engagementPulse: 0.92,
    author: {
      name: 'Tech Editor',
      avatar: '/avatars/tech-editor.jpg'
    },
    readTime: '7 min read',
    publishedAt: '2024-11-10'
  },
  {
    id: 'future-ai-business-analytics',
    title: 'The Future of AI in Business Analytics',
    excerpt: 'Business intelligence is being transformed by artificial intelligence, enabling deeper insights and more accurate predictions.',
    generativeSeed: 'future-ai-business-analytics',
    theme: 'analytics',
    content: {
      founderInstance: 'For founders: How AI analytics can transform business decision-making and strategy...',
      developerInstance: 'For developers: Building AI-powered analytics systems and data pipelines...',
      audioNarrationUrl: '/audio/future-ai-business-analytics.mp3'
    },
    semanticEmbedding: [0.94, -0.82, 0.23, 0.41],
    dynamicTags: ['AI', 'Analytics', 'Business', 'Intelligence'],
    linkedEntities: [
      { type: 'tool', id: 'tool_011', name: 'Tableau AI' },
      { type: 'category', id: 'cat_011', name: 'Analytics' }
    ],
    engagementPulse: 0.86,
    author: {
      name: 'Business Analyst',
      avatar: '/avatars/business-analyst.jpg'
    },
    readTime: '6 min read',
    publishedAt: '2024-11-05'
  },
  {
    id: 'ai-productivity-tools-2024',
    title: 'AI Productivity Tools 2024: Ultimate Guide to Getting More Done',
    excerpt: 'Discover how AI productivity tools are revolutionizing workplace efficiency, from task automation to intelligent scheduling.',
    generativeSeed: 'ai-productivity-tools-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: Leveraging AI productivity tools to maximize team output and streamline operations...',
      developerInstance: 'For developers: Building AI-powered productivity solutions and integrating existing tools...',
      audioNarrationUrl: '/audio/ai-productivity-tools-2024.mp3'
    },
    semanticEmbedding: [0.67, 0.34, -0.23, 0.89],
    dynamicTags: ['Productivity', 'AI Tools', 'Workplace', 'Automation'],
    linkedEntities: [
      { type: 'tool', id: 'tool_008', name: 'Notion AI' },
      { type: 'category', id: 'cat_008', name: 'Productivity Tools' }
    ],
    engagementPulse: 0.91,
    author: {
      name: 'Productivity Expert',
      avatar: '/avatars/productivity-expert.jpg'
    },
    readTime: '7 min read',
    publishedAt: '2024-11-04'
  },
  {
    id: 'ai-tools-comparison-2024',
    title: 'AI Tools Comparison 2024: Best AI Software for Every Need',
    excerpt: 'Comprehensive comparison of the best AI tools available in 2024, helping you choose the right software for your specific needs.',
    generativeSeed: 'ai-tools-comparison-2024',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: Making informed decisions about AI tool investments and implementations...',
      developerInstance: 'For developers: Understanding the technical differences between AI platforms and APIs...',
      audioNarrationUrl: '/audio/ai-tools-comparison-2024.mp3'
    },
    semanticEmbedding: [0.45, -0.67, 0.78, 0.23],
    dynamicTags: ['Comparison', 'AI Tools', 'Software', 'Reviews'],
    linkedEntities: [
      { type: 'tool', id: 'tool_009', name: 'ChatGPT' },
      { type: 'category', id: 'cat_009', name: 'AI Comparison' }
    ],
    engagementPulse: 0.94,
    author: {
      name: 'Tech Reviewer',
      avatar: '/avatars/tech-reviewer.jpg'
    },
    readTime: '10 min read',
    publishedAt: '2024-11-03'
  },
  {
    id: 'future-of-artificial-intelligence',
    title: 'The Future of Artificial Intelligence: Trends and Predictions',
    excerpt: 'Exploring the emerging trends and making predictions about the future of AI and its impact on society, business, and technology.',
    generativeSeed: 'future-of-artificial-intelligence',
    theme: 'ai',
    content: {
      founderInstance: 'For founders: Understanding how future AI trends will shape business strategies and opportunities...',
      developerInstance: 'For developers: Preparing for the next wave of AI technologies and development paradigms...',
      audioNarrationUrl: '/audio/future-of-artificial-intelligence.mp3'
    },
    semanticEmbedding: [0.78, 0.45, -0.56, 0.91],
    dynamicTags: ['Future', 'AI Trends', 'Predictions', 'Technology'],
    linkedEntities: [
      { type: 'tool', id: 'tool_010', name: 'GPT-5' },
      { type: 'category', id: 'cat_010', name: 'AI Future' }
    ],
    engagementPulse: 0.96,
    author: {
      name: 'AI Futurist',
      avatar: '/avatars/ai-futurist.jpg'
    },
    readTime: '12 min read',
    publishedAt: '2024-11-02'
  },
  {
    id: 'machine-learning-beginners-guide',
    title: 'Machine Learning for Beginners: Complete Getting Started Guide',
    excerpt: 'A comprehensive guide for beginners looking to understand and start their journey into machine learning and AI development.',
    generativeSeed: 'machine-learning-beginners-guide',
    theme: 'development',
    content: {
      founderInstance: 'For founders: Understanding the basics of machine learning to make better business decisions...',
      developerInstance: 'For developers: Step-by-step guide to getting started with ML development and best practices...',
      audioNarrationUrl: '/audio/machine-learning-beginners-guide.mp3'
    },
    semanticEmbedding: [0.34, 0.67, 0.89, -0.12],
    dynamicTags: ['Machine Learning', 'Beginners', 'Tutorial', 'Guide'],
    linkedEntities: [
      { type: 'tool', id: 'tool_011', name: 'TensorFlow' },
      { type: 'category', id: 'cat_011', name: 'ML Education' }
    ],
    engagementPulse: 0.88,
    author: {
      name: 'ML Educator',
      avatar: '/avatars/ml-educator.jpg'
    },
    readTime: '15 min read',
    publishedAt: '2024-11-01'
  }
];

// Knowledge Node Component
const KnowledgeNode: React.FC<{ node: KnowledgeNode; index: number; onExpand: (node: KnowledgeNode) => void }> = ({ node, index, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const router = useRouter();
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleClick = useCallback(() => {
    router.push(`/blog/${node.id}`);
  }, [router, node.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      className="relative h-64 mb-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Neural Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <Points>
            <NeuralBackground theme={node.theme} />
          </Points>
        </Canvas>
      </div>

      {/* Glassmorphic Panel */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Holographic Effect on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: -30 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="bg-black/80 backdrop-blur-lg rounded-xl p-4 border border-cyan-400/50 shadow-2xl shadow-cyan-400/20">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{node.author.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{node.author.name}</p>
                    <p className="text-gray-400 text-xs">{node.readTime}</p>
                  </div>
                </div>
                
                {/* Dynamic Tag Cloud */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {node.dynamicTags.slice(0, 3).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded-full border border-cyan-400/30"
                      style={{ fontSize: `${10 + Math.random() * 4}px` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement Pulse */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-xs">{Math.round(node.engagementPulse * 100)}% engagement</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-2 py-1 text-xs rounded-full border ${
                node.theme === 'ai' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' :
                node.theme === 'cybersecurity' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                node.theme === 'development' ? 'bg-blue-500/20 text-blue-300 border-blue-400/30' :
                'bg-purple-500/20 text-purple-300 border-purple-400/30'
              }`}>
                {node.theme.toUpperCase()}
              </span>
              <span className="text-gray-400 text-xs">{node.publishedAt}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{node.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{node.excerpt}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
              <span className="text-gray-400 text-xs">{node.author.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <span>{node.readTime}</span>
              <span>•</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hard Light Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Contextual Nexus Sidebar
const ContextualNexus: React.FC<{ selectedNode?: KnowledgeNode; hoveredNode?: KnowledgeNode }> = ({ selectedNode, hoveredNode }) => {
  const activeNode = hoveredNode || selectedNode;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-0 top-0 h-full w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto z-40"
    >
      <h2 className="text-xl font-bold text-white mb-6">Contextual Nexus</h2>
      
      {activeNode ? (
        <div className="space-y-6">
          {/* Neural Connections */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">Neural Connections</h3>
            <div className="space-y-2">
              {activeNode.linkedEntities.map((entity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{entity.name}</p>
                      <p className="text-gray-400 text-xs">{entity.type}</p>
                    </div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Conversation Pulse */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">Conversation Pulse</h3>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm mb-1">"Revolutionary insights!"</p>
                <p className="text-gray-500 text-xs">- @tech_enthusiast</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-gray-300 text-sm mb-1">"Game changer for our team"</p>
                <p className="text-gray-500 text-xs">- @startup_founder</p>
              </div>
            </div>
          </div>

          {/* Knowledge Depth */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 mb-3">Knowledge Depth</h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-xs">Executive Summary</span>
                <span className="text-gray-400 text-xs">Technical Deep Dive</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                  initial={{ width: "30%" }}
                  animate={{ width: "30%" }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">Hover over or select a Knowledge Node to see connections</p>
        </div>
      )}
    </motion.div>
  );
};

// Main Neural Stream Component
export default function NeuralStream() {
  const [expandedNode, setExpandedNode] = useState<KnowledgeNode | undefined>(undefined);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | undefined>(undefined);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState(knowledgeNodes);
  const streamRef = useRef<HTMLDivElement>(null);

  // Infinite Scroll Simulation
  const loadMoreNodes = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => {
      const newNodes = knowledgeNodes.map(node => ({
        ...node,
        id: `${node.id}_new_${Date.now()}`,
        title: `${node.title} - Extended Analysis`,
        engagementPulse: Math.random()
      }));
      setVisibleNodes(prev => [...prev, ...newNodes]);
      setLoadingMore(false);
    }, 1000);
  }, []);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (streamRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = streamRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loadingMore) {
          loadMoreNodes();
        }
      }
    };

    const element = streamRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [loadingMore, loadMoreNodes]);

  return (
    <>
      <Head>
        <title>Neural Stream - Interactive AI Blog Experience | AI Vault</title>
        <meta name="description" content="Experience the future of content with AI Vault's Neural Stream. Interactive AI blog posts in a 3D neural network visualization with real-time knowledge connections." />
        <meta name="keywords" content="neural stream, AI blog, interactive content, 3D visualization, AI insights, knowledge network, artificial intelligence" />
        <meta name="author" content="AI Vault Team" />
        <link rel="canonical" href="https://aether-nexus.vercel.app/blog/neural-stream" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Neural Stream - Interactive AI Blog Experience | AI Vault" />
        <meta property="og:description" content="Experience the future of content with AI Vault's Neural Stream. Interactive AI blog posts in a 3D neural network visualization with real-time knowledge connections." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aether-nexus.vercel.app/blog/neural-stream" />
        <meta property="og:image" content="https://aether-nexus.vercel.app/images/neural-stream-og-image.jpg" />
        <meta property="og:site_name" content="AI Vault" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neural Stream - Interactive AI Blog Experience" />
        <meta name="twitter:description" content="Experience the future of content with AI Vault's Neural Stream. Interactive AI blog posts in a 3D neural network visualization." />
        <meta name="twitter:image" content="https://aether-nexus.vercel.app/images/neural-stream-og-image.jpg" />
        <meta name="twitter:site" content="@aivault" />
        
        {/* Structured Data - Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://aether-nexus.vercel.app/blog/neural-stream"
            },
            "headline": "Neural Stream - Interactive AI Blog Experience",
            "description": "Experience the future of content with AI Vault's Neural Stream. Interactive AI blog posts in a 3D neural network visualization with real-time knowledge connections.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Vault",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aether-nexus.vercel.app/images/logo.png"
              }
            },
            "datePublished": "2025-11-19",
            "dateModified": "2025-11-19",
            "wordCount": 1200,
            "image": "https://aether-nexus.vercel.app/images/neural-stream-og-image.jpg",
            "keywords": "neural stream, AI blog, interactive content, 3D visualization, AI insights, knowledge network, artificial intelligence",
            "articleSection": "Technology"
          })}
        </script>
        
        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aether-nexus.vercel.app"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://aether-nexus.vercel.app/blog"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Neural Stream",
              "item": "https://aether-nexus.vercel.app/blog/neural-stream"
            }]
          })}
        </script>
        
        {/* Structured Data - FAQ for Answer Engine Optimization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Neural Stream and how does it work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Neural Stream is AI Vault's interactive blog experience that visualizes content in a 3D neural network. It connects related knowledge nodes in real-time, allowing users to explore AI topics through an immersive, interactive interface with dynamic knowledge connections."
                }
              },
              {
                "@type": "Question",
                "name": "How can Neural Stream improve my understanding of AI topics?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Neural Stream enhances learning by showing connections between related concepts, providing multiple perspectives on topics, and allowing interactive exploration. The 3D visualization helps users see how different AI concepts relate to each other in a more intuitive way than traditional text."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Neural Stream different from traditional blogs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unlike traditional linear blogs, Neural Stream presents content as interconnected knowledge nodes in a 3D space. Users can explore topics non-linearly, see real-time connections between concepts, and experience content through interactive visualizations that adapt to their interests."
                }
              }
            ]
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Parallax Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 text-center"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Neural Stream
            </h1>
            <p className="text-gray-400 text-lg">The voice of Atlas Neo • Intelligent • Beautiful • Alive</p>
          </motion.header>

          {/* Knowledge Stream */}
          <div
            ref={streamRef}
            className="max-w-4xl mx-auto px-8 pb-16 h-[calc(100vh-200px)] overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="space-y-0">
              {visibleNodes.map((node, index) => (
                <KnowledgeNode
                  key={node.id}
                  node={node}
                  index={index}
                  onExpand={setExpandedNode}
                />
              ))}
            </div>

            {/* Loading Indicator */}
            {loadingMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Contextual Nexus Sidebar */}
        <ContextualNexus selectedNode={expandedNode} hoveredNode={hoveredNode} />

        {/* Focus Tunnel Overlay */}
        <AnimatePresence>
          {expandedNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-8"
              onClick={() => setExpandedNode(undefined)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{expandedNode.title}</h2>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{expandedNode.author.name}</span>
                      <span>•</span>
                      <span>{expandedNode.readTime}</span>
                      <span>•</span>
                      <span>{expandedNode.publishedAt}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedNode(undefined)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {expandedNode.content.developerInstance}
                  </p>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 mt-6">
                    <h3 className="text-cyan-400 font-semibold mb-2">Instance Switcher</h3>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-400/30">
                        Developer View
                      </button>
                      <button className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg border border-white/20">
                        Founder View
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
