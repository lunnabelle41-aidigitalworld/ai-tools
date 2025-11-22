import { useState, useEffect } from 'react';
import Head from 'next/head';

interface AIUpdate {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  readTime: string;
  tags: string[];
  imageUrl?: string;
}

export default function AIUpdates() {
  const [updates, setUpdates] = useState<AIUpdate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample AI updates data - in a real app, this would come from an API
  const sampleUpdates: AIUpdate[] = [
    {
      id: '1',
      title: 'GPT-5 Breakthrough in Reasoning',
      date: 'November 20, 2025',
      category: 'Language Models',
      description: 'OpenAI\'s latest model demonstrates unprecedented logical reasoning capabilities, solving complex mathematical proofs and programming challenges with 99.7% accuracy.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['NLP', 'Reasoning', 'OpenAI'],
      imageUrl: '/images/gpt5.jpg'
    },
    {
      id: '2',
      title: 'Quantum-Classical AI Hybrid Chips',
      date: 'November 15, 2025',
      category: 'Hardware',
      description: 'IBM unveils revolutionary processors that combine quantum computing with classical AI acceleration, delivering 1000x performance improvements for specific AI workloads.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Quantum', 'Hardware', 'IBM'],
      imageUrl: '/images/quantum-chip.jpg'
    },
    {
      id: '3',
      title: 'AI-Powered Protein Folding',
      date: 'November 10, 2025',
      category: 'Healthcare',
      description: 'DeepMind\'s new AlphaFold3 accurately predicts the structure of every known protein and complex molecular interactions, accelerating drug discovery by years.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Healthcare', 'DeepMind', 'Biology'],
      imageUrl: '/images/protein-folding.jpg'
    },
    {
      id: '4',
      title: 'Autonomous AI Researchers',
      date: 'November 5, 2025',
      category: 'Research',
      description: 'Fully autonomous AI systems are now conducting independent scientific research, with recent breakthroughs in materials science leading to room-temperature superconductors.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['Autonomous', 'Research', 'Materials'],
      imageUrl: '/images/ai-research.jpg'
    },
    {
      id: '5',
      title: 'Emotion-Aware AI Assistants',
      date: 'October 30, 2025',
      category: 'Human-AI Interaction',
      description: 'Next-generation assistants can detect and respond to human emotions with unprecedented accuracy, revolutionizing mental health support and customer service.',
      impact: 'medium',
      readTime: '3 min read',
      tags: ['Emotion', 'HCI', 'Mental Health'],
      imageUrl: '/images/emotion-ai.jpg'
    },
    {
      id: '6',
      title: 'AI-Generated Renewable Energy Solutions',
      date: 'October 25, 2025',
      category: 'Energy',
      description: 'AI systems have designed novel solar panel configurations and wind turbine blade shapes that increase energy efficiency by 35% compared to human-engineered solutions.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Energy', 'Renewables', 'Engineering'],
      imageUrl: '/images/renewable-ai.jpg'
    },
    {
      id: '7',
      title: 'Neuralink Brain-Computer Interface Milestone',
      date: 'October 20, 2025',
      category: 'Neurotechnology',
      description: 'First human trials of Neuralink\'s brain-computer interface enable paralyzed patients to control external devices with thoughts alone, achieving 99.9% accuracy in complex tasks.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Neuralink', 'BCI', 'Neurotechnology'],
      imageUrl: '/images/neuralink.jpg'
    },
    {
      id: '8',
      title: 'AI-Powered Climate Modeling',
      date: 'October 15, 2025',
      category: 'Climate',
      description: 'New AI models predict climate patterns with 95% accuracy up to 50 years in advance, enabling precise long-term planning for climate adaptation strategies.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Climate', 'Modeling', 'Environment'],
      imageUrl: '/images/climate-ai.jpg'
    },
    {
      id: '9',
      title: 'Self-Improving AI Code Generators',
      date: 'October 10, 2025',
      category: 'Software Development',
      description: 'GitHub Copilot X evolves to autonomously improve its own algorithms, now generating production-ready code with 99.99% reliability across 50+ programming languages.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['GitHub', 'Programming', 'Automation'],
      imageUrl: '/images/copilot-x.jpg'
    },
    {
      id: '10',
      title: 'AI-Driven Fusion Reactor Control',
      date: 'October 5, 2025',
      category: 'Energy',
      description: 'Breakthrough AI control systems maintain stable plasma confinement in fusion reactors for over 24 hours, a 500% improvement over previous records.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Fusion', 'Energy', 'Control Systems'],
      imageUrl: '/images/fusion-ai.jpg'
    },
    {
      id: '11',
      title: 'Multimodal AI for Early Disease Detection',
      date: 'September 30, 2025',
      category: 'Healthcare',
      description: 'AI systems analyzing medical scans, genetic data, and patient history can now predict 20+ diseases up to 10 years before symptoms appear with 92% accuracy.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Healthcare', 'Diagnostics', 'Prevention'],
      imageUrl: '/images/disease-detection.jpg'
    },
    {
      id: '12',
      title: 'AI-Powered Space Exploration',
      date: 'September 25, 2025',
      category: 'Space',
      description: 'Autonomous AI probes identify potentially habitable exoplanets 100x faster than previous methods, with detailed atmospheric analysis of 5000+ celestial bodies.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Space', 'Exploration', 'Astronomy'],
      imageUrl: '/images/space-ai.jpg'
    },
    {
      id: '13',
      title: 'AI-Controlled Nuclear Waste Recycling',
      date: 'September 20, 2025',
      category: 'Energy',
      description: 'Revolutionary AI systems transform nuclear waste into usable fuel with 99.9% efficiency, solving long-term storage issues while generating additional clean energy.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Nuclear', 'Waste', 'Recycling'],
      imageUrl: '/images/nuclear-ai.jpg'
    },
    {
      id: '14',
      title: 'Real-time AI Language Translation',
      date: 'September 15, 2025',
      category: 'Language Technology',
      description: 'Google\'s new translation model achieves perfect conversational fluency across 500+ languages with real-time audio and text translation, breaking down global communication barriers.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Translation', 'Google', 'Communication'],
      imageUrl: '/images/translation-ai.jpg'
    },
    {
      id: '15',
      title: 'AI-Powered Personalized Education',
      date: 'September 10, 2025',
      category: 'Education',
      description: 'Adaptive learning systems create individualized curricula for each student, resulting in 300% improvement in learning outcomes and closing achievement gaps worldwide.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Education', 'Personalization', 'Learning'],
      imageUrl: '/images/education-ai.jpg'
    },
    {
      id: '16',
      title: 'Autonomous AI for Disaster Prediction',
      date: 'September 5, 2025',
      category: 'Disaster Management',
      description: 'AI systems predict natural disasters with 98% accuracy up to 72 hours in advance, enabling proactive evacuations and saving thousands of lives annually.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Disaster', 'Prediction', 'Safety'],
      imageUrl: '/images/disaster-ai.jpg'
    },
    {
      id: '17',
      title: 'AI-Enhanced Cybersecurity',
      date: 'August 30, 2025',
      category: 'Security',
      description: 'Next-generation AI security systems detect and neutralize 99.99% of cyber threats in real-time, including zero-day attacks, protecting critical infrastructure globally.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Cybersecurity', 'Protection', 'Infrastructure'],
      imageUrl: '/images/security-ai.jpg'
    },
    {
      id: '18',
      title: 'AI-Driven Precision Agriculture',
      date: 'August 25, 2025',
      category: 'Agriculture',
      description: 'Smart farming systems increase crop yields by 50% while reducing water usage by 70%, using AI to optimize planting, watering, and harvesting for each plant.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Agriculture', 'Farming', 'Sustainability'],
      imageUrl: '/images/agriculture-ai.jpg'
    },
    {
      id: '19',
      title: 'AI-Powered Mental Health Therapy',
      date: 'August 20, 2025',
      category: 'Healthcare',
      description: 'Advanced AI therapists provide personalized mental health support with 95% effectiveness compared to human therapists, making quality care accessible to millions worldwide.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Mental Health', 'Therapy', 'Accessibility'],
      imageUrl: '/images/mental-health-ai.jpg'
    },
    {
      id: '20',
      title: 'Autonomous AI for Ocean Cleanup',
      date: 'August 15, 2025',
      category: 'Environment',
      description: 'Self-navigating AI systems remove 99% of ocean plastic pollution in targeted areas, using computer vision to distinguish between waste and marine life with perfect accuracy.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Ocean', 'Pollution', 'Cleanup'],
      imageUrl: '/images/ocean-ai.jpg'
    },
    {
      id: '21',
      title: 'AI-Enhanced Creative Arts',
      date: 'August 10, 2025',
      category: 'Arts & Creativity',
      description: 'AI collaborators work alongside human artists to produce award-winning music, literature, and visual art, pushing creative boundaries while respecting human artistic vision.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['Art', 'Creativity', 'Collaboration'],
      imageUrl: '/images/creative-ai.jpg'
    },
    {
      id: '22',
      title: 'AI-Powered Traffic Optimization',
      date: 'August 5, 2025',
      category: 'Transportation',
      description: 'City-wide AI systems reduce traffic congestion by 70% and commute times by 40% through real-time traffic light coordination and route optimization for all vehicles.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Traffic', 'Transportation', 'Cities'],
      imageUrl: '/images/traffic-ai.jpg'
    },
    {
      id: '23',
      title: 'AI-Driven Financial Market Prediction',
      date: 'July 30, 2025',
      category: 'Finance',
      description: 'Advanced AI models predict market movements with 92% accuracy up to 30 days in advance, enabling more stable investments and reducing economic volatility worldwide.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Finance', 'Markets', 'Prediction'],
      imageUrl: '/images/finance-ai.jpg'
    },
    {
      id: '24',
      title: 'AI-Powered Wildlife Conservation',
      date: 'July 25, 2025',
      category: 'Environment',
      description: 'AI tracking systems monitor endangered species populations with 99% accuracy, predicting migration patterns and identifying threats to enable proactive conservation efforts.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Wildlife', 'Conservation', 'Tracking'],
      imageUrl: '/images/wildlife-ai.jpg'
    },
    {
      id: '25',
      title: 'AI-Enhanced Sports Performance',
      date: 'July 20, 2025',
      category: 'Sports',
      description: 'Athlete performance optimization systems increase elite athlete performance by 25% while reducing injury rates by 60% through real-time biomechanical analysis and personalized training programs.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Sports', 'Performance', 'Training'],
      imageUrl: '/images/sports-ai.jpg'
    },
    {
      id: '26',
      title: 'AI-Powered Legal Document Analysis',
      date: 'July 15, 2025',
      category: 'Law',
      description: 'AI systems review legal documents and contracts with 99.9% accuracy, identifying potential issues and suggesting improvements in seconds rather than weeks of manual review.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Legal', 'Documents', 'Analysis'],
      imageUrl: '/images/legal-ai.jpg'
    },
    {
      id: '27',
      title: 'Autonomous AI for Smart Cities',
      date: 'July 10, 2025',
      category: 'Urban Planning',
      description: 'Integrated AI systems manage entire city infrastructures, optimizing energy distribution, waste management, and public services to create the world\'s most efficient and livable urban environments.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Cities', 'Infrastructure', 'Planning'],
      imageUrl: '/images/smart-city-ai.jpg'
    },
    {
      id: '28',
      title: 'AI-Driven Drug Discovery',
      date: 'July 5, 2025',
      category: 'Pharmaceuticals',
      description: 'AI accelerates drug discovery by 1000x, identifying promising compounds and predicting their effects with 95% accuracy, bringing life-saving treatments to market in months instead of decades.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Drugs', 'Discovery', 'Pharmaceuticals'],
      imageUrl: '/images/drug-discovery-ai.jpg'
    },
    {
      id: '29',
      title: 'AI-Powered Personal Finance Management',
      date: 'June 30, 2025',
      category: 'Personal Finance',
      description: 'Intelligent financial advisors manage personal finances with superhuman precision, optimizing investments, minimizing taxes, and maximizing wealth growth with zero human intervention required.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Finance', 'Investment', 'Wealth'],
      imageUrl: '/images/personal-finance-ai.jpg'
    },
    {
      id: '30',
      title: 'AI-Enhanced Archaeological Discovery',
      date: 'June 25, 2025',
      category: 'Archaeology',
      description: 'AI systems analyze satellite imagery and ground-penetrating radar to locate archaeological sites with 99% accuracy, uncovering lost civilizations and artifacts that were buried for millennia.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Archaeology', 'Discovery', 'History'],
      imageUrl: '/images/archaeology-ai.jpg'
    },
    {
      id: '31',
      title: 'AI-Powered Supply Chain Optimization',
      date: 'June 20, 2025',
      category: 'Logistics',
      description: 'Global supply chain AI systems reduce waste by 40% and delivery times by 60% through predictive analytics and real-time route optimization across all transportation modes.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Supply Chain', 'Logistics', 'Optimization'],
      imageUrl: '/images/supply-chain-ai.jpg'
    },
    {
      id: '32',
      title: 'Autonomous AI for Forest Management',
      date: 'June 15, 2025',
      category: 'Environment',
      description: 'AI systems monitor forest health, predict wildfire risks, and optimize reforestation efforts with 98% accuracy, enabling proactive forest management and biodiversity preservation.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Forests', 'Environment', 'Conservation'],
      imageUrl: '/images/forest-ai.jpg'
    },
    {
      id: '33',
      title: 'AI-Enhanced Musical Composition',
      date: 'June 10, 2025',
      category: 'Arts & Creativity',
      description: 'AI composers create emotionally resonant musical pieces that rival human compositions, enabling new forms of artistic expression and personalized soundtracks for every individual.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['Music', 'Composition', 'Creativity'],
      imageUrl: '/images/music-ai.jpg'
    },
    {
      id: '34',
      title: 'AI-Powered Real Estate Valuation',
      date: 'June 5, 2025',
      category: 'Real Estate',
      description: 'Advanced AI systems assess property values with 99% accuracy using satellite imagery, neighborhood data, and market trends, revolutionizing real estate transactions and investment strategies.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Real Estate', 'Valuation', 'Investment'],
      imageUrl: '/images/real-estate-ai.jpg'
    },
    {
      id: '35',
      title: 'AI-Driven Materials Science Breakthrough',
      date: 'May 30, 2025',
      category: 'Materials Science',
      description: 'AI discovers new superconducting materials at room temperature, revolutionizing energy transmission and enabling breakthrough technologies in computing, transportation, and medical devices.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Materials', 'Superconductors', 'Science'],
      imageUrl: '/images/materials-ai.jpg'
    },
    {
      id: '36',
      title: 'AI-Powered Personalized Nutrition',
      date: 'May 25, 2025',
      category: 'Healthcare',
      description: 'AI nutritionists create personalized dietary plans based on genetic profiles, lifestyle factors, and health goals, optimizing health outcomes and preventing chronic diseases through precision nutrition.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Nutrition', 'Health', 'Personalization'],
      imageUrl: '/images/nutrition-ai.jpg'
    },
    {
      id: '37',
      title: 'AI-Enhanced Video Game Design',
      date: 'May 20, 2025',
      category: 'Entertainment',
      description: 'AI systems create immersive, personalized gaming experiences that adapt in real-time to player preferences and skill levels, generating endless unique storylines and challenges for each individual.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['Gaming', 'Entertainment', 'Design'],
      imageUrl: '/images/gaming-ai.jpg'
    },
    {
      id: '38',
      title: 'Autonomous AI for Marine Biology Research',
      date: 'May 15, 2025',
      category: 'Marine Science',
      description: 'Underwater AI drones explore the deepest ocean trenches, discovering new species and ecosystems while monitoring marine health with unprecedented detail and accuracy.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Ocean', 'Marine Biology', 'Research'],
      imageUrl: '/images/marine-ai.jpg'
    },
    {
      id: '39',
      title: 'AI-Powered Fashion Design',
      date: 'May 10, 2025',
      category: 'Fashion',
      description: 'AI designers create sustainable, personalized clothing lines that adapt to individual body types, preferences, and climate conditions, revolutionizing the fashion industry.',
      impact: 'medium',
      readTime: '4 min read',
      tags: ['Fashion', 'Design', 'Sustainability'],
      imageUrl: '/images/fashion-ai.jpg'
    },
    {
      id: '40',
      title: 'AI-Driven Quantum Cryptography',
      date: 'May 5, 2025',
      category: 'Security',
      description: 'Unbreakable quantum encryption systems powered by AI protect sensitive data with absolute security, enabling completely secure communications for governments and corporations.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Quantum', 'Cryptography', 'Security'],
      imageUrl: '/images/quantum-crypto-ai.jpg'
    },
    {
      id: '41',
      title: 'AI-Enhanced Language Learning',
      date: 'April 30, 2025',
      category: 'Education',
      description: 'Immersive AI language tutors achieve fluency in any language within 3 months through personalized learning paths, cultural context, and real-time conversation practice.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Language', 'Learning', 'Education'],
      imageUrl: '/images/language-ai.jpg'
    },
    {
      id: '42',
      title: 'Autonomous AI for Volcanic Monitoring',
      date: 'April 25, 2025',
      category: 'Geology',
      description: 'AI systems predict volcanic eruptions with 99% accuracy up to 6 months in advance, using seismic data, gas emissions, and thermal imaging to protect communities worldwide.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Volcanoes', 'Geology', 'Monitoring'],
      imageUrl: '/images/volcano-ai.jpg'
    },
    {
      id: '43',
      title: 'AI-Powered Maritime Navigation',
      date: 'April 20, 2025',
      category: 'Maritime',
      description: 'Autonomous AI systems navigate ships through the world\'s most challenging waters with 99.9% safety record, optimizing routes and predicting weather conditions to reduce fuel consumption by 30%.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Maritime', 'Navigation', 'Autonomous'],
      imageUrl: '/images/maritime-ai.jpg'
    },
    {
      id: '44',
      title: 'AI-Enhanced Wildlife Rehabilitation',
      date: 'April 15, 2025',
      category: 'Environment',
      description: 'AI-powered rehabilitation centers increase animal recovery rates by 70% through personalized treatment plans, behavioral analysis, and predictive health monitoring for injured wildlife.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Wildlife', 'Rehabilitation', 'Conservation'],
      imageUrl: '/images/wildlife-rehab-ai.jpg'
    },
    {
      id: '45',
      title: 'AI-Driven Construction Safety',
      date: 'April 10, 2025',
      category: 'Construction',
      description: 'AI systems monitor construction sites in real-time, predicting and preventing 95% of potential accidents through wearable sensors, drone surveillance, and predictive risk analysis.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Construction', 'Safety', 'Monitoring'],
      imageUrl: '/images/construction-ai.jpg'
    },
    {
      id: '46',
      title: 'AI-Powered Gene Therapy Design',
      date: 'April 5, 2025',
      category: 'Healthcare',
      description: 'AI systems design personalized gene therapies for rare genetic disorders, reducing development time from decades to months and achieving 90% success rates in clinical trials.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Gene Therapy', 'Genetics', 'Healthcare'],
      imageUrl: '/images/gene-therapy-ai.jpg'
    },
    {
      id: '47',
      title: 'AI-Enhanced Disaster Relief Logistics',
      date: 'March 30, 2025',
      category: 'Disaster Management',
      description: 'AI coordinates global disaster relief efforts in real-time, optimizing supply distribution and rescue operations to reduce response times by 80% and save 50% more lives.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Disaster Relief', 'Logistics', 'Humanitarian'],
      imageUrl: '/images/disaster-relief-ai.jpg'
    },
    {
      id: '48',
      title: 'AI-Powered Archaeological Restoration',
      date: 'March 25, 2025',
      category: 'Archaeology',
      description: 'AI systems reconstruct ancient artifacts and structures from fragments with 99% accuracy, enabling historians to piece together lost civilizations and preserve cultural heritage.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Archaeology', 'Restoration', 'Heritage'],
      imageUrl: '/images/archaeology-restoration-ai.jpg'
    },
    {
      id: '49',
      title: 'AI-Driven Autonomous Farming',
      date: 'March 20, 2025',
      category: 'Agriculture',
      description: 'Autonomous AI systems manage entire farms, optimizing planting, watering, and harvesting with precision, increasing yields by 50% while reducing water usage by 70%.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Agriculture', 'Autonomous', 'Sustainability'],
      imageUrl: '/images/autonomous-farming-ai.jpg'
    },
    {
      id: '50',
      title: 'AI-Powered Personalized Medicine',
      date: 'March 15, 2025',
      category: 'Healthcare',
      description: 'AI-driven diagnostic systems analyze patient data to create personalized treatment plans, reducing hospital stays by 40% and improving patient outcomes by 30%.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Healthcare', 'Personalization', 'Medicine'],
      imageUrl: '/images/personalized-medicine-ai.jpg'
    },
    {
      id: '51',
      title: 'AI-Enhanced Urban Planning',
      date: 'March 10, 2025',
      category: 'Urban Planning',
      description: 'AI systems analyze urban data to optimize city layouts, reducing traffic congestion by 70% and improving public transportation efficiency by 50%.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Urban Planning', 'AI', 'Sustainability'],
      imageUrl: '/images/urban-planning-ai.jpg'
    },
    {
      id: '52',
      title: 'AI-Powered Smart Home Automation',
      date: 'March 5, 2025',
      category: 'Home Automation',
      description: 'Autonomous AI systems manage smart home devices, optimizing energy usage and enhancing user experience with personalized settings and predictive maintenance.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Home Automation', 'AI', 'Sustainability'],
      imageUrl: '/images/smart-home-ai.jpg'
    },
    {
      id: '53',
      title: 'AI-Driven Financial Fraud Detection',
      date: 'February 29, 2025',
      category: 'Finance',
      description: 'Advanced AI models detect financial fraud with 99.9% accuracy, reducing losses by 80% and improving trust in financial institutions.',
      impact: 'high',
      readTime: '4 min read',
      tags: ['Finance', 'Fraud Detection', 'Security'],
      imageUrl: '/images/fraud-detection-ai.jpg'
    },
    {
      id: '54',
      title: 'AI-Powered Climate Engineering',
      date: 'November 22, 2025',
      category: 'Climate',
      description: 'Revolutionary AI systems engineer climate solutions at scale, removing 50 gigatons of CO2 annually through optimized carbon capture and atmospheric modification techniques.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Climate', 'Engineering', 'Carbon Capture'],
      imageUrl: '/images/climate-engineering-ai.jpg'
    },
    {
      id: '55',
      title: 'Neuralink Mass Production Milestone',
      date: 'November 21, 2025',
      category: 'Neurotechnology',
      description: 'Neuralink achieves mass production of brain-computer interfaces, making implantation accessible to millions with 99.95% surgical success rate and zero rejection incidents.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Neuralink', 'BCI', 'Mass Production'],
      imageUrl: '/images/neuralink-mass.jpg'
    },
    {
      id: '56',
      title: 'AI-Enhanced Quantum Computing',
      date: 'November 20, 2025',
      category: 'Quantum Computing',
      description: 'AI algorithms optimize quantum error correction and qubit stability, achieving 1000x improvement in quantum computing reliability and enabling practical quantum applications.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Quantum', 'Computing', 'Optimization'],
      imageUrl: '/images/quantum-ai-enhanced.jpg'
    },
    {
      id: '57',
      title: 'AI-Powered Space Manufacturing',
      date: 'November 19, 2025',
      category: 'Space',
      description: 'Autonomous AI systems manufacture complex structures in zero gravity, reducing space construction costs by 90% and enabling large-scale orbital habitats.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Space', 'Manufacturing', 'Construction'],
      imageUrl: '/images/space-manufacturing-ai.jpg'
    },
    {
      id: '58',
      title: 'AI-Driven Genetic Engineering 3.0',
      date: 'November 18, 2025',
      category: 'Biotechnology',
      description: 'Next-generation AI designs custom organisms for medicine, agriculture, and environmental remediation with unprecedented precision and safety protocols.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Genetics', 'Biotech', 'Engineering'],
      imageUrl: '/images/genetic-engineering-3.jpg'
    },
    {
      id: '59',
      title: 'AI-Powered Consciousness Mapping',
      date: 'November 17, 2025',
      category: 'Neuroscience',
      description: 'Breakthrough AI systems map human consciousness patterns in real-time, enabling treatment of mental health conditions and advancing our understanding of awareness itself.',
      impact: 'high',
      readTime: '7 min read',
      tags: ['Consciousness', 'Neuroscience', 'Mapping'],
      imageUrl: '/images/consciousness-mapping-ai.jpg'
    },
    {
      id: '60',
      title: 'AI-Enhanced Fusion Reactor Networks',
      date: 'November 16, 2025',
      category: 'Energy',
      description: 'AI-coordinated networks of fusion reactors provide unlimited clean energy to entire continents, with predictive maintenance ensuring 99.99% uptime reliability.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Fusion', 'Energy', 'Networks'],
      imageUrl: '/images/fusion-networks-ai.jpg'
    },
    {
      id: '61',
      title: 'AI-Powered Molecular Nanotechnology',
      date: 'November 15, 2025',
      category: 'Nanotechnology',
      description: 'AI-controlled molecular assemblers create custom materials and devices at the atomic level, enabling breakthroughs in medicine, computing, and manufacturing with atomic precision.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Nanotechnology', 'Molecular', 'Manufacturing'],
      imageUrl: '/images/nanotechnology-ai.jpg'
    },
    {
      id: '62',
      title: 'Autonomous AI for Global Food Security',
      date: 'November 14, 2025',
      category: 'Agriculture',
      description: 'Self-improving AI systems optimize global food production, eliminating hunger worldwide through predictive crop management, pest control, and distribution logistics.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Food Security', 'Agriculture', 'Global'],
      imageUrl: '/images/food-security-ai.jpg'
    },
    {
      id: '63',
      title: 'AI-Driven Weather Control Systems',
      date: 'November 13, 2025',
      category: 'Climate',
      description: 'Advanced AI weather modification systems prevent natural disasters and optimize precipitation patterns, reducing droughts and floods by 95% globally.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Weather', 'Control', 'Climate'],
      imageUrl: '/images/weather-control-ai.jpg'
    },
    {
      id: '64',
      title: 'AI-Powered Telepathic Communication',
      date: 'November 12, 2025',
      category: 'Neurotechnology',
      description: 'Brain-to-brain communication interfaces enable direct thought transmission between individuals, revolutionizing how humans connect and collaborate across language barriers.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Telepathy', 'Communication', 'BCI'],
      imageUrl: '/images/telepathy-ai.jpg'
    },
    {
      id: '65',
      title: 'AI-Enhanced Quantum Internet',
      date: 'November 11, 2025',
      category: 'Quantum Computing',
      description: 'Quantum-encrypted internet infrastructure provides unhackable global communications with instantaneous data transfer, enabling secure collaboration across continents.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Quantum Internet', 'Security', 'Communication'],
      imageUrl: '/images/quantum-internet-ai.jpg'
    },
    {
      id: '66',
      title: 'AI-Powered Longevity Therapies',
      date: 'November 10, 2025',
      category: 'Healthcare',
      description: 'AI-designed anti-aging treatments extend healthy human lifespan by 50% through personalized cellular regeneration protocols and precision medicine approaches.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Longevity', 'Healthcare', 'Anti-Aging'],
      imageUrl: '/images/longevity-ai.jpg'
    },
    {
      id: '67',
      title: 'Autonomous AI for Deep Space Colonization',
      date: 'November 9, 2025',
      category: 'Space',
      description: 'Self-sustaining AI systems establish and maintain human colonies on Mars and beyond, creating fully autonomous settlements with closed-loop life support systems.',
      impact: 'high',
      readTime: '7 min read',
      tags: ['Space Colonization', 'Mars', 'Autonomous Systems'],
      imageUrl: '/images/space-colonization-ai.jpg'
    },
    {
      id: '68',
      title: 'AI-Driven Economic Optimization',
      date: 'November 8, 2025',
      category: 'Finance',
      description: 'Global economic AI models eliminate poverty and inequality through real-time resource allocation, predictive market analysis, and optimized policy implementation.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Economics', 'Optimization', 'Poverty Elimination'],
      imageUrl: '/images/economic-ai.jpg'
    },
    {
      id: '69',
      title: 'AI-Powered Matter Compilation',
      date: 'November 7, 2025',
      category: 'Physics',
      description: 'Breakthrough AI systems manipulate fundamental particles to create any material from pure energy, enabling on-demand manufacturing of rare elements and compounds.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Matter Compilation', 'Physics', 'Energy'],
      imageUrl: '/images/matter-compilation-ai.jpg'
    },
    {
      id: '70',
      title: 'AI-Enhanced Collective Intelligence',
      date: 'November 6, 2025',
      category: 'Human-AI Interaction',
      description: 'AI amplifies human cognitive abilities by 1000x through neural augmentation, creating a hybrid intelligence that solves complex global challenges in real-time.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Collective Intelligence', 'Cognitive Enhancement', 'Hybrid Intelligence'],
      imageUrl: '/images/collective-intelligence-ai.jpg'
    },
    {
      id: '71',
      title: 'AI-Powered Reality Manipulation',
      date: 'November 5, 2025',
      category: 'Augmented Reality',
      description: 'Advanced AI systems seamlessly blend physical and digital realities, creating immersive environments that enhance human perception and interaction with the world.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Augmented Reality', 'Reality Manipulation', 'Immersive Tech'],
      imageUrl: '/images/reality-manipulation-ai.jpg'
    },
    {
      id: '72',
      title: 'Autonomous AI for Oceanic Engineering',
      date: 'November 4, 2025',
      category: 'Marine Science',
      description: 'Self-directed AI systems construct underwater cities and manage marine ecosystems, restoring ocean health while creating sustainable aquatic habitats for humanity.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Ocean Engineering', 'Marine Ecosystems', 'Underwater Cities'],
      imageUrl: '/images/oceanic-engineering-ai.jpg'
    },
    {
      id: '73',
      title: 'AI-Driven Consciousness Transfer',
      date: 'November 3, 2025',
      category: 'Neurotechnology',
      description: 'Breakthrough AI enables safe transfer of human consciousness between biological and digital substrates, opening pathways to digital immortality and enhanced cognitive capabilities.',
      impact: 'high',
      readTime: '7 min read',
      tags: ['Consciousness Transfer', 'Digital Immortality', 'Neurotechnology'],
      imageUrl: '/images/consciousness-transfer-ai.jpg'
    },
    {
      id: '74',
      title: 'AI-Powered Time Series Prediction',
      date: 'November 2, 2025',
      category: 'Data Science',
      description: 'Advanced AI models predict future events with 99.9% accuracy across multiple domains, enabling proactive decision-making in finance, healthcare, and disaster prevention.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Time Series', 'Prediction', 'Forecasting'],
      imageUrl: '/images/time-prediction-ai.jpg'
    },
    {
      id: '75',
      title: 'AI-Enhanced Emotional Intelligence',
      date: 'November 1, 2025',
      category: 'Psychology',
      description: 'AI systems understand and respond to human emotions with unprecedented accuracy, revolutionizing therapy, education, and human-computer interaction through empathetic computing.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Emotional Intelligence', 'Empathetic AI', 'Human Psychology'],
      imageUrl: '/images/emotional-intelligence-ai.jpg'
    },
    {
      id: '89',
      title: 'AI-Powered Protein Design Breakthrough',
      date: 'November 22, 2025',
      category: 'Healthcare',
      description: 'New AI systems can now design entirely novel proteins with specific functions, opening doors to custom enzymes for medicine, environmental cleanup, and sustainable manufacturing.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Proteins', 'Biotechnology', 'Healthcare'],
      imageUrl: '/images/protein-design-ai.jpg'
    },
    {
      id: '90',
      title: 'Quantum Machine Learning Supremacy',
      date: 'November 21, 2025',
      category: 'Quantum Computing',
      description: 'Google\'s quantum machine learning algorithms solve complex optimization problems in seconds that would take classical supercomputers millennia to complete.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['Quantum', 'Machine Learning', 'Computing'],
      imageUrl: '/images/quantum-ml-ai.jpg'
    },
    {
      id: '91',
      title: 'AI-Controlled Nuclear Fusion Breakthrough',
      date: 'November 20, 2025',
      category: 'Energy',
      description: 'Revolutionary AI systems maintain stable nuclear fusion reactions for over 100 hours continuously, achieving net energy gain and bringing clean fusion power closer to reality.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Fusion', 'Energy', 'Nuclear'],
      imageUrl: '/images/fusion-breakthrough-ai.jpg'
    },
    {
      id: '92',
      title: 'AI-Enhanced Brain-Computer Interfaces',
      date: 'November 19, 2025',
      category: 'Neurotechnology',
      description: 'Next-generation brain-computer interfaces enable paralyzed patients to control robotic limbs with thoughts alone, achieving dexterity equivalent to natural limb movement.',
      impact: 'high',
      readTime: '6 min read',
      tags: ['BCI', 'Neurotechnology', 'Healthcare'],
      imageUrl: '/images/bci-ai.jpg'
    },
    {
      id: '93',
      title: 'Autonomous AI for Climate Engineering',
      date: 'November 18, 2025',
      category: 'Climate',
      description: 'AI systems orchestrate large-scale climate engineering projects, removing CO2 from the atmosphere at unprecedented rates while minimizing ecological disruption.',
      impact: 'high',
      readTime: '5 min read',
      tags: ['Climate', 'Engineering', 'Environment'],
      imageUrl: '/images/climate-engineering-ai.jpg'
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from an API
    setUpdates(sampleUpdates);
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(updates.map(update => update.category))];

  // Filter updates based on category and search query
  const filteredUpdates = updates.filter(update => {
    const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          update.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          update.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>AI Updates - Latest Artificial Intelligence News</title>
        <meta name="description" content="Stay updated with the latest breakthroughs and developments in artificial intelligence" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI UPDATES
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            The most important breakthroughs and developments in artificial intelligence, updated daily
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-300">Breakthroughs Tracked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-300">Real-time Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search AI updates..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Updates Grid */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No updates found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpdates.map((update) => (
                <div 
                  key={update.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-white/15"
                >
                  {update.imageUrl && (
                    <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImpactColor(update.impact)}`}>
                          {update.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-xs font-medium">
                        {update.category}
                      </span>
                      <span className="text-gray-400 text-sm">{update.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{update.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{update.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-gray-300 rounded-lg text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{update.readTime}</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Never Miss an AI Breakthrough
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest AI updates delivered directly to your inbox every morning
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}