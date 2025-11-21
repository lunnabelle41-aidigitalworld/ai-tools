// New AI Tools to be added to tools.ts

const newTools = [
  // AI for Education - Student Engagement
  {
    "id": "edu-se-001",
    "name": "EngageAI",
    "category": "AI for Education",
    "subcategory": "Student Engagement",
    "rating": 4.7,
    "description": "AI-powered platform that enhances student engagement through interactive learning experiences and real-time feedback.",
    "pricing": "$10-25/student/month",
    "tags": ["Student Engagement", "Interactive Learning", "Education Technology"],
    "url": "https://www.engageai-edu.com",
    "favicon": "https://www.engageai-edu.com/favicon.ico"
  },
  {
    "id": "edu-se-002",
    "name": "ClassPulse",
    "category": "AI for Education",
    "subcategory": "Student Engagement",
    "rating": 4.6,
    "description": "Real-time student engagement tracker that provides insights into class participation and understanding.",
    "pricing": "$15-30/classroom/month",
    "tags": ["Classroom Engagement", "Participation Analytics", "Education Tech"],
    "url": "https://www.classpulse.ai",
    "favicon": "https://www.classpulse.ai/favicon.ico"
  },
  
  // AI for Education - Intelligent Tutoring
  {
    "id": "edu-it-001",
    "name": "TutorAI",
    "category": "AI for Education",
    "subcategory": "Intelligent Tutoring",
    "rating": 4.8,
    "description": "AI tutor that provides personalized learning experiences and adapts to each student's learning style.",
    "pricing": "$20-40/student/month",
    "tags": ["Intelligent Tutoring", "Personalized Learning", "Education"],
    "url": "https://www.tutorai.com",
    "favicon": "https://www.tutorai.com/favicon.ico"
  },
  
  // AI for Healthcare - Diagnostic Support
  {
    "id": "health-ds-001",
    "name": "DxAI",
    "category": "AI for Healthcare",
    "subcategory": "Diagnostic Support",
    "rating": 4.9,
    "description": "AI-powered diagnostic support system that helps healthcare professionals make accurate diagnoses.",
    "pricing": "Contact for pricing",
    "tags": ["Medical Diagnosis", "Healthcare AI", "Clinical Decision Support"],
    "url": "https://www.dxai-health.com",
    "favicon": "https://www.dxai-health.com/favicon.ico"
  },
  
  // AI for Finance - Fraud Detection
  {
    "id": "finance-fd-001",
    "name": "FraudShield AI",
    "category": "AI for Finance",
    "subcategory": "Fraud Detection",
    "rating": 4.8,
    "description": "Advanced AI system for detecting and preventing financial fraud in real-time.",
    "pricing": "$500-5000/month",
    "tags": ["Fraud Prevention", "Financial Security", "AI in Finance"],
    "url": "https://www.fraudshieldai.com",
    "favicon": "https://www.fraudshieldai.com/favicon.ico"
  },
  
  // AI for Marketing - Customer Segmentation
  {
    "id": "marketing-cs-001",
    "name": "SegmentAI",
    "category": "AI for Marketing",
    "subcategory": "Customer Segmentation",
    "rating": 4.7,
    "description": "AI-powered customer segmentation tool that helps businesses target the right audience with precision.",
    "pricing": "$99-499/month",
    "tags": ["Customer Segmentation", "Marketing Automation", "AI Analytics"],
    "url": "https://www.segmentai.com",
    "favicon": "https://www.segmentai.com/favicon.ico"
  },
  
  // AI for Retail - Personalized Recommendations
  {
    "id": "retail-pr-001",
    "name": "RecoAI",
    "category": "AI for Retail",
    "subcategory": "Personalized Recommendations",
    "rating": 4.8,
    "description": "AI-driven recommendation engine that boosts sales through personalized product suggestions.",
    "pricing": "$200-2000/month",
    "tags": ["Product Recommendations", "Retail AI", "Personalization"],
    "url": "https://www.recoai.com",
    "favicon": "https://www.recoai.com/favicon.ico"
  },
  
  // AI for Manufacturing - Predictive Maintenance
  {
    "id": "mfg-pm-001",
    "name": "PredictX",
    "category": "AI for Manufacturing",
    "subcategory": "Predictive Maintenance",
    "rating": 4.7,
    "description": "AI-powered predictive maintenance solution that reduces downtime and maintenance costs.",
    "pricing": "$1000-10000/month",
    "tags": ["Predictive Maintenance", "Industrial AI", "Manufacturing"],
    "url": "https://www.predictx.ai",
    "favicon": "https://www.predictx.ai/favicon.ico"
  },
  
  // AI for Transportation - Route Optimization
  {
    "id": "trans-ro-001",
    "name": "RouteGenius AI",
    "category": "AI for Transportation",
    "subcategory": "Route Optimization",
    "rating": 4.6,
    "description": "AI-powered route optimization for logistics and delivery services to save time and fuel costs.",
    "pricing": "$300-3000/month",
    "tags": ["Route Planning", "Logistics AI", "Transportation"],
    "url": "https://www.routegeniusai.com",
    "favicon": "https://www.routegeniusai.com/favicon.ico"
  },
  
  // AI for Real Estate - Property Valuation
  {
    "id": "re-pv-001",
    "name": "Valore AI",
    "category": "AI for Real Estate",
    "subcategory": "Property Valuation",
    "rating": 4.7,
    "description": "AI-powered property valuation tool that provides accurate real estate price estimates.",
    "pricing": "$50-500/month",
    "tags": ["Real Estate", "Property Valuation", "AI in Real Estate"],
    "url": "https://www.valoreai.com",
    "favicon": "https://www.valoreai.com/favicon.ico"
  },
  
  // AI for Agriculture - Crop Monitoring
  {
    "id": "agri-cm-001",
    "name": "AgriSight AI",
    "category": "AI for Agriculture",
    "subcategory": "Crop Monitoring",
    "rating": 4.8,
    "description": "AI-powered crop monitoring system that helps farmers optimize yields and reduce waste.",
    "pricing": "$50-500/month",
    "tags": ["Precision Agriculture", "Crop Health", "Farm Management"],
    "url": "https://www.agrisight.ai",
    "favicon": "https://www.agrisight.ai/favicon.ico"
  },
  
  // AI for Energy - Smart Grid Management
  {
    "id": "energy-sg-001",
    "name": "GridMind AI",
    "category": "AI for Energy",
    "subcategory": "Smart Grid Management",
    "rating": 4.7,
    "description": "AI solution for optimizing energy distribution and managing smart grids efficiently.",
    "pricing": "Contact for pricing",
    "tags": ["Smart Grid", "Energy Management", "AI in Energy"],
    "url": "https://www.gridmindai.com",
    "favicon": "https://www.gridmindai.com/favicon.ico"
  },
  
  // AI for Cybersecurity - Threat Detection
  {
    "id": "cyber-td-001",
    "name": "ThreatShield AI",
    "category": "AI for Cybersecurity",
    "subcategory": "Threat Detection",
    "rating": 4.9,
    "description": "Advanced AI system for detecting and mitigating cybersecurity threats in real-time.",
    "pricing": "$500-5000/month",
    "tags": ["Cybersecurity", "Threat Intelligence", "AI Security"],
    "url": "https://www.threatshieldai.com",
    "favicon": "https://www.threatshieldai.com/favicon.ico"
  },
  
  // AI for Human Resources - Recruitment
  {
    "id": "hr-rec-001",
    "name": "HireAI",
    "category": "AI for Human Resources",
    "subcategory": "Recruitment",
    "rating": 4.6,
    "description": "AI-powered recruitment platform that helps companies find and hire the best talent efficiently.",
    "pricing": "$200-2000/month",
    "tags": ["Recruitment", "Talent Acquisition", "HR Tech"],
    "url": "https://www.hireai.com",
    "favicon": "https://www.hireai.com/favicon.ico"
  },
  
  // AI for Customer Service - Chatbots
  {
    "id": "cs-chat-001",
    "name": "ChatGenius",
    "category": "AI for Customer Service",
    "subcategory": "Chatbots",
    "rating": 4.7,
    "description": "Intelligent chatbot solution that provides 24/7 customer support with human-like interactions.",
    "pricing": "$100-1000/month",
    "tags": ["Chatbot", "Customer Support", "AI Assistant"],
    "url": "https://www.chatgenius.ai",
    "favicon": "https://www.chatgenius.ai/favicon.ico"
  },
  
  // AI for Education - Language Learning
  {
    "id": "edu-ll-001",
    "name": "LinguaBot",
    "category": "AI for Education",
    "subcategory": "Language Learning",
    "rating": 4.7,
    "description": "AI-powered language learning platform with personalized lessons and real-time pronunciation feedback.",
    "pricing": "$12.99-29.99/month",
    "tags": ["Language Learning", "Education", "AI Tutor"],
    "url": "https://www.linguabot.ai",
    "favicon": "https://www.linguabot.ai/favicon.ico"
  },
  {
    "id": "edu-ll-002",
    "name": "FluentAI",
    "category": "AI for Education",
    "subcategory": "Language Learning",
    "rating": 4.8,
    "description": "Immersive language learning with AI conversation partners and cultural context integration.",
    "pricing": "$14.99-34.99/month",
    "tags": ["Language Learning", "Conversational AI", "Education"],
    "url": "https://www.fluentai.com",
    "favicon": "https://www.fluentai.com/favicon.ico"
  },

  // AI for Healthcare - Medical Imaging
  {
    "id": "health-mi-001",
    "name": "RadiologyAI",
    "category": "AI for Healthcare",
    "subcategory": "Medical Imaging",
    "rating": 4.9,
    "description": "Advanced AI for analyzing medical images with high accuracy and speed.",
    "pricing": "Contact for pricing",
    "tags": ["Radiology", "Medical Imaging", "Healthcare AI"],
    "url": "https://www.radiologyai.com",
    "favicon": "https://www.radiologyai.com/favicon.ico"
  },
  {
    "id": "health-mi-002",
    "name": "DeepScan AI",
    "category": "AI for Healthcare",
    "subcategory": "Medical Imaging",
    "rating": 4.8,
    "description": "AI-powered diagnostic imaging for early detection of abnormalities.",
    "pricing": "$500-5000/month",
    "tags": ["Diagnostic Imaging", "AI in Healthcare", "Radiology"],
    "url": "https://www.deepscanai.com",
    "favicon": "https://www.deepscanai.com/favicon.ico"
  },

  // AI for Finance - Algorithmic Trading
  {
    "id": "finance-at-001",
    "name": "TradeMind AI",
    "category": "AI for Finance",
    "subcategory": "Algorithmic Trading",
    "rating": 4.9,
    "description": "AI-driven algorithmic trading platform with predictive market analysis.",
    "pricing": "$99-999/month",
    "tags": ["Algorithmic Trading", "Finance", "Stock Market"],
    "url": "https://www.trademindai.com",
    "favicon": "https://www.trademindai.com/favicon.ico"
  },
  {
    "id": "finance-at-002",
    "name": "QuantEdge",
    "category": "AI for Finance",
    "subcategory": "Algorithmic Trading",
    "rating": 4.8,
    "description": "Advanced quantitative trading strategies powered by machine learning.",
    "pricing": "$199-1999/month",
    "tags": ["Quantitative Trading", "AI Finance", "Investment"],
    "url": "https://www.quantedge.ai",
    "favicon": "https://www.quantedge.ai/favicon.ico"
  },

  // AI for Marketing - Content Generation
  {
    "id": "marketing-cg-001",
    "name": "ContentGenius",
    "category": "AI for Marketing",
    "subcategory": "Content Generation",
    "rating": 4.7,
    "description": "AI-powered content creation tool for marketers and content creators.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Marketing", "AI Writing"],
    "url": "https://www.contentgenius.ai",
    "favicon": "https://www.contentgenius.ai/favicon.ico"
  },
  {
    "id": "marketing-cg-002",
    "name": "CopyCraft",
    "category": "AI for Marketing",
    "subcategory": "Content Generation",
    "rating": 4.6,
    "description": "AI copywriting assistant for creating compelling marketing content.",
    "pricing": "$19-199/month",
    "tags": ["Copywriting", "Content Marketing", "AI Assistant"],
    "url": "https://www.copycraft.ai",
    "favicon": "https://www.copycraft.ai/favicon.ico"
  },

  // AI for Retail - Inventory Management
  {
    "id": "retail-im-001",
    "name": "StockSense AI",
    "category": "AI for Retail",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory optimization and demand forecasting for retailers.",
    "pricing": "$99-999/month",
    "tags": ["Inventory Management", "Retail", "Supply Chain"],
    "url": "https://www.stocksenseai.com",
    "favicon": "https://www.stocksenseai.com/favicon.ico"
  },
  {
    "id": "retail-im-002",
    "name": "SmartStock",
    "category": "AI for Retail",
    "subcategory": "Inventory Management",
    "rating": 4.6,
    "description": "Intelligent inventory management system with automated restocking alerts.",
    "pricing": "$79-799/month",
    "tags": ["Retail Analytics", "Inventory Control", "AI Retail"],
    "url": "https://www.smartstock.ai",
    "favicon": "https://www.smartstock.ai/favicon.ico"
  },

  // AI for Manufacturing - Quality Control
  {
    "id": "mfg-qc-001",
    "name": "QualiScan AI",
    "category": "AI for Manufacturing",
    "subcategory": "Quality Control",
    "rating": 4.8,
    "description": "Computer vision system for automated quality inspection in manufacturing.",
    "pricing": "$1000-10000/month",
    "tags": ["Quality Control", "Computer Vision", "Manufacturing"],
    "url": "https://www.qualiscan.ai",
    "favicon": "https://www.qualiscan.ai/favicon.ico"
  },
  {
    "id": "mfg-qc-002",
    "name": "InspectAI",
    "category": "AI for Manufacturing",
    "subcategory": "Quality Control",
    "rating": 4.7,
    "description": "AI-powered visual inspection system for manufacturing quality assurance.",
    "pricing": "Contact for pricing",
    "tags": ["Quality Assurance", "Manufacturing AI", "Defect Detection"],
    "url": "https://www.inspectai.tech",
    "favicon": "https://www.inspectai.tech/favicon.ico"
  },

  // AI for Transportation - Autonomous Vehicles
  {
    "id": "trans-av-001",
    "name": "AutoPilot AI",
    "category": "AI for Transportation",
    "subcategory": "Autonomous Vehicles",
    "rating": 4.9,
    "description": "Advanced AI system for autonomous vehicle navigation and safety.",
    "pricing": "Contact for pricing",
    "tags": ["Autonomous Vehicles", "Self-Driving", "Transportation AI"],
    "url": "https://www.autopilotai.tech",
    "favicon": "https://www.autopilotai.tech/favicon.ico"
  },
  {
    "id": "trans-av-002",
    "name": "DriveMind",
    "category": "AI for Transportation",
    "subcategory": "Autonomous Vehicles",
    "rating": 4.8,
    "description": "AI-powered perception and decision-making system for self-driving cars.",
    "pricing": "Contact for pricing",
    "tags": ["Self-Driving Cars", "Autonomous Tech", "AI Navigation"],
    "url": "https://www.drivemind.ai",
    "favicon": "https://www.drivemind.ai/favicon.ico"
  },

  // AI for Real Estate - Virtual Tours
  {
    "id": "re-vt-001",
    "name": "TourAI",
    "category": "AI for Real Estate",
    "subcategory": "Virtual Tours",
    "rating": 4.7,
    "description": "AI-generated virtual property tours with interactive elements.",
    "pricing": "$49-499/month",
    "tags": ["Virtual Tours", "Real Estate Tech", "3D Visualization"],
    "url": "https://www.tourai.com",
    "favicon": "https://www.tourai.com/favicon.ico"
  },
  {
    "id": "re-vt-002",
    "name": "VirtualEstate",
    "category": "AI for Real Estate",
    "subcategory": "Virtual Tours",
    "rating": 4.6,
    "description": "Immersive 3D property tours powered by AI and computer vision.",
    "pricing": "$79-799/month",
    "tags": ["3D Tours", "Real Estate Marketing", "Virtual Showings"],
    "url": "https://www.virtualestate.ai",
    "favicon": "https://www.virtualestate.ai/favicon.ico"
  },

  // AI for Agriculture - Precision Farming
  {
    "id": "agri-pf-001",
    "name": "AgriDrone AI",
    "category": "AI for Agriculture",
    "subcategory": "Precision Farming",
    "rating": 4.7,
    "description": "AI-powered drone system for precision agriculture and crop monitoring.",
    "pricing": "$200-2000/month",
    "tags": ["Precision Agriculture", "Drone Technology", "Crop Monitoring"],
    "url": "https://www.agridrone.ai",
    "favicon": "https://www.agridrone.ai/favicon.ico"
  },
  {
    "id": "agri-pf-002",
    "name": "FarmSight",
    "category": "AI for Agriculture",
    "subcategory": "Precision Farming",
    "rating": 4.6,
    "description": "AI analytics platform for precision farming and yield optimization.",
    "pricing": "$150-1500/month",
    "tags": ["Smart Farming", "Agricultural Analytics", "Crop Management"],
    "url": "https://www.farmsight.ai",
    "favicon": "https://www.farmsight.ai/favicon.ico"
  },

  // AI for Energy - Renewable Energy Optimization
  {
    "id": "energy-re-001",
    "name": "SolarAI",
    "category": "AI for Energy",
    "subcategory": "Renewable Energy Optimization",
    "rating": 4.8,
    "description": "AI platform for optimizing solar energy production and storage.",
    "pricing": "$500-5000/month",
    "tags": ["Solar Energy", "Renewable Tech", "Energy Optimization"],
    "url": "https://www.solarai.energy",
    "favicon": "https://www.solarai.energy/favicon.ico"
  },
  {
    "id": "energy-re-002",
    "name": "WindMind",
    "category": "AI for Energy",
    "subcategory": "Renewable Energy Optimization",
    "rating": 4.7,
    "description": "AI-powered system for optimizing wind farm performance and maintenance.",
    "pricing": "$1000-10000/month",
    "tags": ["Wind Energy", "Renewable Optimization", "Energy AI"],
    "url": "https://www.windmind.ai",
    "favicon": "https://www.windmind.ai/favicon.ico"
  },

  // AI for Cybersecurity - Threat Intelligence
  {
    "id": "cyber-ti-001",
    "name": "ThreatIntel AI",
    "category": "AI for Cybersecurity",
    "subcategory": "Threat Intelligence",
    "rating": 4.9,
    "description": "AI-powered threat intelligence platform for proactive cybersecurity.",
    "pricing": "$1000-10000/month",
    "tags": ["Threat Intelligence", "Cybersecurity", "AI Security"],
    "url": "https://www.threatintel.ai",
    "favicon": "https://www.threatintel.ai/favicon.ico"
  },
  {
    "id": "cyber-ti-002",
    "name": "SecureNet AI",
    "category": "AI for Cybersecurity",
    "subcategory": "Threat Intelligence",
    "rating": 4.8,
    "description": "Comprehensive threat intelligence and network security platform.",
    "pricing": "$500-5000/month",
    "tags": ["Network Security", "Threat Detection", "AI Cybersecurity"],
    "url": "https://www.securenetai.com",
    "favicon": "https://www.securenetai.com/favicon.ico"
  },

  // AI for Human Resources - Employee Engagement
  {
    "id": "hr-ee-001",
    "name": "EngageHR",
    "category": "AI for Human Resources",
    "subcategory": "Employee Engagement",
    "rating": 4.6,
    "description": "AI platform for measuring and improving employee engagement and satisfaction.",
    "pricing": "$5-15/employee/month",
    "tags": ["Employee Engagement", "HR Tech", "Workplace Analytics"],
    "url": "https://www.engagehr.ai",
    "favicon": "https://www.engagehr.ai/favicon.ico"
  },
  {
    "id": "hr-ee-002",
    "name": "PulseAI",
    "category": "AI for Human Resources",
    "subcategory": "Employee Engagement",
    "rating": 4.5,
    "description": "Real-time employee sentiment analysis and engagement tracking.",
    "pricing": "$4-12/employee/month",
    "tags": ["Employee Sentiment", "HR Analytics", "Workplace Culture"],
    "url": "https://www.pulseai.hr",
    "favicon": "https://www.pulseai.hr/favicon.ico"
  },

  // AI for Customer Service - Sentiment Analysis
  {
    "id": "cs-sa-001",
    "name": "Sentimind",
    "category": "AI for Customer Service",
    "subcategory": "Sentiment Analysis",
    "rating": 4.7,
    "description": "AI-powered sentiment analysis for understanding customer emotions and feedback.",
    "pricing": "$99-999/month",
    "tags": ["Sentiment Analysis", "Customer Feedback", "AI Analytics"],
    "url": "https://www.sentimind.ai",
    "favicon": "https://www.sentimind.ai/favicon.ico"
  },
  {
    "id": "cs-sa-002",
    "name": "EmoteAI",
    "category": "AI for Customer Service",
    "subcategory": "Sentiment Analysis",
    "rating": 4.6,
    "description": "Advanced emotion detection and sentiment analysis for customer interactions.",
    "pricing": "$149-1499/month",
    "tags": ["Emotion Detection", "Customer Experience", "AI Analytics"],
    "url": "https://www.emoteai.com",
    "favicon": "https://www.emoteai.com/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-001",
    "name": "ContractMind",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.8,
    "description": "AI-powered contract analysis and review platform for legal professionals.",
    "pricing": "$99-999/month",
    "tags": ["Legal Tech", "Contract Review", "AI Law"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },
  {
    "id": "legal-ca-002",
    "name": "LexiAI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "Automated contract analysis with AI-powered risk assessment and clause identification.",
    "pricing": "$149-1499/month",
    "tags": ["Legal Analysis", "Contract Management", "AI Legal Assistant"],
    "url": "https://www.lexiai.legal",
    "favicon": "https://www.lexiai.legal/favicon.ico"
  },

  // AI for E-commerce - Visual Search
  {
    "id": "ecom-vs-001",
    "name": "VisualSearch AI",
    "category": "AI for E-commerce",
    "subcategory": "Visual Search",
    "rating": 4.7,
    "description": "AI-powered visual search engine for e-commerce product discovery.",
    "pricing": "$199-1999/month",
    "tags": ["Visual Search", "E-commerce", "Image Recognition"],
    "url": "https://www.visualsearchai.com",
    "favicon": "https://www.visualsearchai.com/favicon.ico"
  },
  {
    "id": "ecom-vs-002",
    "name": "SnapFind",
    "category": "AI for E-commerce",
    "subcategory": "Visual Search",
    "rating": 4.6,
    "description": "Snap a photo to find similar products with AI-powered visual search technology.",
    "pricing": "$149-1499/month",
    "tags": ["Visual Commerce", "Product Discovery", "AI Search"],
    "url": "https://www.snapfind.ai",
    "favicon": "https://www.snapfind.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-001",
    "name": "EditAI",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "AI-powered video editing platform that automates the editing process.",
    "pricing": "$29-299/month",
    "tags": ["Video Editing", "Content Creation", "AI Media Tools"],
    "url": "https://www.editaivideo.com",
    "favicon": "https://www.editaivideo.com/favicon.ico"
  },
  {
    "id": "media-ve-002",
    "name": "ClipGenius",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.7,
    "description": "Automated video editing with AI-powered scene detection and transitions.",
    "pricing": "$39-399/month",
    "tags": ["Automated Editing", "Video Production", "AI Content Creation"],
    "url": "https://www.clipgenius.ai",
    "favicon": "https://www.clipgenius.ai/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-001",
    "name": "NexusAI",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.8,
    "description": "Advanced AI for creating realistic and adaptive NPC behaviors in games.",
    "pricing": "$99-999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.nexusai.games",
    "favicon": "https://www.nexusai.games/favicon.ico"
  },
  {
    "id": "gaming-npc-002",
    "name": "AetherMind",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Next-generation AI for dynamic and responsive non-player characters.",
    "pricing": "$149-1499/month",
    "tags": ["Game AI", "Character Behavior", "Procedural Generation"],
    "url": "https://www.aethermind.games",
    "favicon": "https://www.aethermind.games/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-001",
    "name": "FitAI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "AI-powered virtual try-on for fashion e-commerce with realistic 3D rendering.",
    "pricing": "$199-1999/month",
    "tags": ["Virtual Fitting", "Fashion Tech", "E-commerce"],
    "url": "https://www.fitai.fashion",
    "favicon": "https://www.fitai.fashion/favicon.ico"
  },
  {
    "id": "fashion-vt-002",
    "name": "StyleMirror",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.6,
    "description": "Augmented reality virtual try-on solution for fashion retailers.",
    "pricing": "$299-2999/month",
    "tags": ["AR Fashion", "Virtual Dressing Room", "Retail Tech"],
    "url": "https://www.stylemirror.ai",
    "favicon": "https://www.stylemirror.ai/favicon.ico"
  },

  // AI for Insurance - Claims Processing
  {
    "id": "insurance-cp-001",
    "name": "ClaimAI",
    "category": "AI for Insurance",
    "subcategory": "Claims Processing",
    "rating": 4.8,
    "description": "AI-powered claims processing system that automates and accelerates insurance claims.",
    "pricing": "Contact for pricing",
    "tags": ["Insurance Tech", "Claims Automation", "AI in Insurance"],
    "url": "https://www.claimai.insure",
    "favicon": "https://www.claimai.insure/favicon.ico"
  },
  {
    "id": "insurance-cp-002",
    "name": "InsureFlow",
    "category": "AI for Insurance",
    "subcategory": "Claims Processing",
    "rating": 4.7,
    "description": "End-to-end AI solution for insurance claims management and fraud detection.",
    "pricing": "$500-5000/month",
    "tags": ["Claims Management", "Fraud Detection", "Insurance AI"],
    "url": "https://www.insureflow.ai",
    "favicon": "https://www.insureflow.ai/favicon.ico"
  },

  // AI for Music - Composition
  {
    "id": "music-comp-001",
    "name": "MelodyMind",
    "category": "AI for Music",
    "subcategory": "Composition",
    "rating": 4.7,
    "description": "AI music composition assistant that helps create original melodies and arrangements.",
    "pricing": "$19-199/month",
    "tags": ["Music Composition", "AI Music", "Creative Tools"],
    "url": "https://www.melodymind.ai",
    "favicon": "https://www.melodymind.ai/favicon.ico"
  },
  {
    "id": "music-comp-002",
    "name": "SonicAI",
    "category": "AI for Music",
    "subcategory": "Composition",
    "rating": 4.6,
    "description": "AI-powered music creation platform with advanced composition tools.",
    "pricing": "$29-299/month",
    "tags": ["Music Production", "AI Composer", "Digital Audio Workstation"],
    "url": "https://www.sonicai.music",
    "favicon": "https://www.sonicai.music/favicon.ico"
  },

  // AI for Fitness - Personal Training
  {
    "id": "fitness-pt-001",
    "name": "FitGenius AI",
    "category": "AI for Fitness",
    "subcategory": "Personal Training",
    "rating": 4.7,
    "description": "AI personal trainer that creates customized workout plans and provides real-time feedback.",
    "pricing": "$19.99-49.99/month",
    "tags": ["Fitness Tech", "Personal Training", "Health & Wellness"],
    "url": "https://www.fitgenius.ai",
    "favicon": "https://www.fitgenius.ai/favicon.ico"
  },
  {
    "id": "fitness-pt-002",
    "name": "TrainAI",
    "category": "AI for Fitness",
    "subcategory": "Personal Training",
    "rating": 4.6,
    "description": "AI-powered fitness coaching with personalized workout and nutrition plans.",
    "pricing": "$14.99-39.99/month",
    "tags": ["Fitness Coaching", "AI Trainer", "Health Tech"],
    "url": "https://www.trainai.fit",
    "favicon": "https://www.trainai.fit/favicon.ico"
  },

  // AI for Travel - Personalized Recommendations
  {
    "id": "travel-pr-001",
    "name": "WanderAI",
    "category": "AI for Travel",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI travel assistant that creates personalized itineraries based on preferences.",
    "pricing": "Free - $9.99/month",
    "tags": ["Travel Tech", "Itinerary Planning", "AI Travel Agent"],
    "url": "https://www.wanderai.travel",
    "favicon": "https://www.wanderai.travel/favicon.ico"
  },
  {
    "id": "travel-pr-002",
    "name": "TripGenie",
    "category": "AI for Travel",
    "subcategory": "Personalized Recommendations",
    "rating": 4.6,
    "description": "AI-powered travel planning platform that suggests destinations and activities.",
    "pricing": "Free - $14.99/month",
    "tags": ["Travel Planning", "Destination Finder", "AI Recommendations"],
    "url": "https://www.tripgenie.ai",
    "favicon": "https://www.tripgenie.ai/favicon.ico"
  },

  // AI for Mental Health - Therapy
  {
    "id": "mhealth-th-001",
    "name": "MindEase",
    "category": "AI for Mental Health",
    "subcategory": "Therapy",
    "rating": 4.8,
    "description": "AI-powered mental health platform offering therapeutic conversations and mood tracking.",
    "pricing": "$9.99-29.99/month",
    "tags": ["Mental Health", "Therapy", "Wellness"],
    "url": "https://www.mindease.ai",
    "favicon": "https://www.mindease.ai/favicon.ico"
  },
  {
    "id": "mhealth-th-002",
    "name": "SerenityAI",
    "category": "AI for Mental Health",
    "subcategory": "Therapy",
    "rating": 4.7,
    "description": "AI therapy assistant providing cognitive behavioral therapy techniques and support.",
    "pricing": "$14.99-39.99/month",
    "tags": ["CBT", "Mental Wellness", "AI Therapy"],
    "url": "https://www.serenityai.health",
    "favicon": "https://www.serenityai.health/favicon.ico"
  },

  // AI for Education - Special Needs
  {
    "id": "edu-sn-001",
    "name": "IncluLearn",
    "category": "AI for Education",
    "subcategory": "Special Needs",
    "rating": 4.8,
    "description": "AI-powered learning platform designed for students with special educational needs.",
    "pricing": "$15-30/student/month",
    "tags": ["Special Education", "Inclusive Learning", "Accessibility"],
    "url": "https://www.inclulearn.ai",
    "favicon": "https://www.inclulearn.ai/favicon.ico"
  },
  {
    "id": "edu-sn-002",
    "name": "EduAssist",
    "category": "AI for Education",
    "subcategory": "Special Needs",
    "rating": 4.7,
    "description": "AI assistant that adapts learning materials for students with learning disabilities.",
    "pricing": "$12-25/student/month",
    "tags": ["Learning Disabilities", "Adaptive Learning", "Education Tech"],
    "url": "https://www.eduassist.ai",
    "favicon": "https://www.eduassist.ai/favicon.ico"
  },

  // AI for Healthcare - Drug Discovery
  {
    "id": "health-dd-001",
    "name": "PharmaAI",
    "category": "AI for Healthcare",
    "subcategory": "Drug Discovery",
    "rating": 4.9,
    "description": "AI platform accelerating drug discovery and development processes.",
    "pricing": "Contact for pricing",
    "tags": ["Pharmaceuticals", "Drug Development", "Healthcare AI"],
    "url": "https://www.pharmaai.tech",
    "favicon": "https://www.pharmaai.tech/favicon.ico"
  },
  {
    "id": "health-dd-002",
    "name": "MoleculeMind",
    "category": "AI for Healthcare",
    "subcategory": "Drug Discovery",
    "rating": 4.8,
    "description": "AI-powered molecular modeling and drug design platform.",
    "pricing": "$5000+/month",
    "tags": ["Molecular Modeling", "Drug Design", "Biotech"],
    "url": "https://www.moleculemind.ai",
    "favicon": "https://www.moleculemind.ai/favicon.ico"
  },

  // AI for Finance - Risk Management
  {
    "id": "finance-rm-001",
    "name": "RiskAware",
    "category": "AI for Finance",
    "subcategory": "Risk Management",
    "rating": 4.8,
    "description": "AI-powered risk assessment and management platform for financial institutions.",
    "pricing": "$499-4999/month",
    "tags": ["Risk Assessment", "Financial Risk", "AI in Finance"],
    "url": "https://www.riskaware.ai",
    "favicon": "https://www.riskaware.ai/favicon.ico"
  },
  {
    "id": "finance-rm-002",
    "name": "FinShield",
    "category": "AI for Finance",
    "subcategory": "Risk Management",
    "rating": 4.7,
    "description": "Compliance and risk management solution powered by AI and machine learning.",
    "pricing": "$999-9999/month",
    "tags": ["Compliance", "Financial Risk", "Regulatory Tech"],
    "url": "https://www.finshield.ai",
    "favicon": "https://www.finshield.ai/favicon.ico"
  },

  // AI for Marketing - Social Media
  {
    "id": "marketing-sm-001",
    "name": "SocialPulse",
    "category": "AI for Marketing",
    "subcategory": "Social Media",
    "rating": 4.7,
    "description": "AI-powered social media management and analytics platform.",
    "pricing": "$29-299/month",
    "tags": ["Social Media Management", "Marketing Analytics", "AI Marketing"],
    "url": "https://www.socialpulse.ai",
    "favicon": "https://www.socialpulse.ai/favicon.ico"
  },
  {
    "id": "marketing-sm-002",
    "name": "InfluencerAI",
    "category": "AI for Marketing",
    "subcategory": "Social Media",
    "rating": 4.6,
    "description": "AI platform for finding and managing influencer marketing campaigns.",
    "pricing": "$99-999/month",
    "tags": ["Influencer Marketing", "Social Media", "Brand Partnerships"],
    "url": "https://www.influencerai.co",
    "favicon": "https://www.influencerai.co/favicon.ico"
  },

  // AI for Retail - Customer Analytics
  {
    "id": "retail-ca-001",
    "name": "RetailInsight",
    "category": "AI for Retail",
    "subcategory": "Customer Analytics",
    "rating": 4.7,
    "description": "AI-powered customer behavior analytics for retail businesses.",
    "pricing": "$199-1999/month",
    "tags": ["Retail Analytics", "Customer Behavior", "AI Retail"],
    "url": "https://www.retailinsight.ai",
    "favicon": "https://www.retailinsight.ai/favicon.ico"
  },
  {
    "id": "retail-ca-002",
    "name": "ShopperMind",
    "category": "AI for Retail",
    "subcategory": "Customer Analytics",
    "rating": 4.6,
    "description": "AI solution for understanding and predicting customer preferences and behavior.",
    "pricing": "$299-2999/month",
    "tags": ["Customer Insights", "Retail Tech", "Predictive Analytics"],
    "url": "https://www.shoppermind.ai",
    "favicon": "https://www.shoppermind.ai/favicon.ico"
  },

  // AI for Manufacturing - Supply Chain
  {
    "id": "mfg-sc-001",
    "name": "ChainAI",
    "category": "AI for Manufacturing",
    "subcategory": "Supply Chain",
    "rating": 4.8,
    "description": "AI-powered supply chain optimization and management platform.",
    "pricing": "$999-9999/month",
    "tags": ["Supply Chain Management", "Logistics", "Manufacturing AI"],
    "url": "https://www.chainai.tech",
    "favicon": "https://www.chainai.tech/favicon.ico"
  },
  {
    "id": "mfg-sc-002",
    "name": "LogiMind",
    "category": "AI for Manufacturing",
    "subcategory": "Supply Chain",
    "rating": 4.7,
    "description": "AI-driven logistics and supply chain optimization solution.",
    "pricing": "$1499-14999/month",
    "tags": ["Logistics", "Supply Chain Optimization", "AI in Manufacturing"],
    "url": "https://www.logimind.ai",
    "favicon": "https://www.logimind.ai/favicon.ico"
  },

  // AI for Transportation - Fleet Management
  {
    "id": "trans-fm-001",
    "name": "FleetAI",
    "category": "AI for Transportation",
    "subcategory": "Fleet Management",
    "rating": 4.7,
    "description": "AI-powered fleet management and optimization platform.",
    "pricing": "$50-500/vehicle/month",
    "tags": ["Fleet Management", "Transportation", "Logistics"],
    "url": "https://www.fleetai.tech",
    "favicon": "https://www.fleetai.tech/favicon.ico"
  },
  {
    "id": "trans-fm-002",
    "name": "TruckMind",
    "category": "AI for Transportation",
    "subcategory": "Fleet Management",
    "rating": 4.6,
    "description": "AI solution for truck fleet management and logistics optimization.",
    "pricing": "$75-750/vehicle/month",
    "tags": ["Trucking", "Fleet Optimization", "Transportation Tech"],
    "url": "https://www.truckmind.ai",
    "favicon": "https://www.truckmind.ai/favicon.ico"
  },

  // AI for Real Estate - Property Management
  {
    "id": "re-pm-001",
    "name": "RentMind",
    "category": "AI for Real Estate",
    "subcategory": "Property Management",
    "rating": 4.7,
    "description": "AI-powered property management platform for landlords and property managers.",
    "pricing": "$1-5/unit/month",
    "tags": ["Property Management", "Real Estate Tech", "Rental Management"],
    "url": "https://www.rentmind.ai",
    "favicon": "https://www.rentmind.ai/favicon.ico"
  },
  {
    "id": "re-pm-002",
    "name": "SmartLease",
    "category": "AI for Real Estate",
    "subcategory": "Property Management",
    "rating": 4.6,
    "description": "AI-driven lease management and tenant screening solution.",
    "pricing": "$2-10/unit/month",
    "tags": ["Lease Management", "Tenant Screening", "Property Tech"],
    "url": "https://www.smartlease.ai",
    "favicon": "https://www.smartlease.ai/favicon.ico"
  },

  // AI for Agriculture - Livestock Monitoring
  {
    "id": "agri-lm-001",
    "name": "HerdMind",
    "category": "AI for Agriculture",
    "subcategory": "Livestock Monitoring",
    "rating": 4.7,
    "description": "AI-powered livestock health and behavior monitoring system.",
    "pricing": "$10-50/animal/year",
    "tags": ["Livestock Management", "Animal Health", "Precision Agriculture"],
    "url": "https://www.herdmind.ag",
    "favicon": "https://www.herdmind.ag/favicon.ico"
  },
  {
    "id": "agri-lm-002",
    "name": "CattleEye",
    "category": "AI for Agriculture",
    "subcategory": "Livestock Monitoring",
    "rating": 4.6,
    "description": "Computer vision system for monitoring cattle health and behavior.",
    "pricing": "$15-75/animal/year",
    "tags": ["Cattle Monitoring", "Animal Welfare", "Farm Tech"],
    "url": "https://www.cattleeye.ai",
    "favicon": "https://www.cattleeye.ai/favicon.ico"
  },

  // AI for Energy - Smart Metering
  {
    "id": "energy-sm-001",
    "name": "MeterMind",
    "category": "AI for Energy",
    "subcategory": "Smart Metering",
    "rating": 4.7,
    "description": "AI-powered smart metering and energy consumption analytics.",
    "pricing": "$0.50-5/meter/month",
    "tags": ["Smart Meters", "Energy Analytics", "Utility Tech"],
    "url": "https://www.metermind.energy",
    "favicon": "https://www.metermind.energy/favicon.ico"
  },
  {
    "id": "energy-sm-002",
    "name": "EcoMeter",
    "category": "AI for Energy",
    "subcategory": "Smart Metering",
    "rating": 4.6,
    "description": "AI-driven energy monitoring and optimization for smart homes and buildings.",
    "pricing": "$1-10/device/month",
    "tags": ["Energy Monitoring", "Smart Home", "Energy Efficiency"],
    "url": "https://www.ecometer.ai",
    "favicon": "https://www.ecometer.ai/favicon.ico"
  },

  // AI for Cybersecurity - Network Security
  {
    "id": "cyber-ns-001",
    "name": "NetShield AI",
    "category": "AI for Cybersecurity",
    "subcategory": "Network Security",
    "rating": 4.9,
    "description": "AI-powered network security and threat detection platform.",
    "pricing": "$999-9999/month",
    "tags": ["Network Security", "Threat Detection", "AI Cybersecurity"],
    "url": "https://www.netshieldai.com",
    "favicon": "https://www.netshieldai.com/favicon.ico"
  },
  {
    "id": "cyber-ns-002",
    "name": "SecureNet Pro",
    "category": "AI for Cybersecurity",
    "subcategory": "Network Security",
    "rating": 4.8,
    "description": "Advanced AI-driven network protection and intrusion prevention system.",
    "pricing": "$1499-14999/month",
    "tags": ["Intrusion Prevention", "Network Protection", "AI Security"],
    "url": "https://www.securenetpro.ai",
    "favicon": "https://www.securenetpro.ai/favicon.ico"
  },

  // AI for Human Resources - Recruitment
  {
    "id": "hr-rec-001",
    "name": "HireVue",
    "category": "AI for Human Resources",
    "subcategory": "Recruitment",
    "rating": 4.7,
    "description": "AI-powered video interviewing and candidate assessment platform.",
    "pricing": "$10,000+/year",
    "tags": ["Video Interviewing", "Talent Acquisition", "HR Tech"],
    "url": "https://www.hirevue.com",
    "favicon": "https://www.hirevue.com/favicon.ico"
  },
  {
    "id": "hr-rec-002",
    "name": "Pymetrics",
    "category": "AI for Human Resources",
    "subcategory": "Recruitment",
    "rating": 4.6,
    "description": "Neuroscience-based recruitment platform using AI to match candidates to roles.",
    "pricing": "Contact for pricing",
    "tags": ["Talent Matching", "Recruitment Tech", "HR Analytics"],
    "url": "https://www.pymetrics.ai",
    "favicon": "https://www.pymetrics.ai/favicon.ico"
  },

  // AI for Customer Service - Voice Assistants
  {
    "id": "cs-va-001",
    "name": "VoiceGenie",
    "category": "AI for Customer Service",
    "subcategory": "Voice Assistants",
    "rating": 4.7,
    "description": "AI-powered voice assistant for customer service and support.",
    "pricing": "$0.01-0.10/minute",
    "tags": ["Voice Assistant", "Customer Support", "Conversational AI"],
    "url": "https://www.voicegenie.ai",
    "favicon": "https://www.voicegenie.ai/favicon.ico"
  },
  {
    "id": "cs-va-002",
    "name": "CallAI",
    "category": "AI for Customer Service",
    "subcategory": "Voice Assistants",
    "rating": 4.6,
    "description": "AI call center solution with natural language processing and voice recognition.",
    "pricing": "$0.02-0.15/minute",
    "tags": ["Call Center AI", "Voice Recognition", "Customer Service"],
    "url": "https://www.callai.tech",
    "favicon": "https://www.callai.tech/favicon.ico"
  },

  // AI for Education - Automated Grading
  {
    "id": "edu-ag-001",
    "name": "GradeGenius",
    "category": "AI for Education",
    "subcategory": "Automated Grading",
    "rating": 4.6,
    "description": "AI-powered automated grading system that provides instant feedback on assignments and exams.",
    "pricing": "$2-10/student/month",
    "tags": ["Grading", "Education Tech", "Automated Feedback"],
    "url": "https://www.gradegenius.ai",
    "favicon": "https://www.gradegenius.ai/favicon.ico"
  },

  // AI for Healthcare - Drug Discovery
  {
    "id": "health-dd-003",
    "name": "MoleculeAI",
    "category": "AI for Healthcare",
    "subcategory": "Drug Discovery",
    "rating": 4.8,
    "description": "AI platform accelerating drug discovery through advanced molecular analysis.",
    "pricing": "Contact for pricing",
    "tags": ["Pharmaceuticals", "Drug Development", "Healthcare AI"],
    "url": "https://www.moleculeai.health",
    "favicon": "https://www.moleculeai.health/favicon.ico"
  },

  // AI for Finance - Personal Finance
  {
    "id": "finance-pf-001",
    "name": "WealthMind",
    "category": "AI for Finance",
    "subcategory": "Personal Finance",
    "rating": 4.7,
    "description": "AI-powered personal finance assistant that helps with budgeting and investment strategies.",
    "pricing": "$9.99-29.99/month",
    "tags": ["Personal Finance", "Wealth Management", "Financial Planning"],
    "url": "https://www.wealthmind.ai",
    "favicon": "https://www.wealthmind.ai/favicon.ico"
  },

  // AI for Marketing - Social Media Analytics
  {
    "id": "marketing-sma-001",
    "name": "SocialInsight",
    "category": "AI for Marketing",
    "subcategory": "Social Media Analytics",
    "rating": 4.6,
    "description": "Comprehensive social media analytics platform with AI-powered insights.",
    "pricing": "$49-499/month",
    "tags": ["Social Media", "Analytics", "Marketing Insights"],
    "url": "https://www.socialinsight.ai",
    "favicon": "https://www.socialinsight.ai/favicon.ico"
  },

  // AI for Retail - Customer Behavior Analysis
  {
    "id": "retail-cba-001",
    "name": "ShopperInsight",
    "category": "AI for Retail",
    "subcategory": "Customer Behavior Analysis",
    "rating": 4.7,
    "description": "AI-powered analysis of customer behavior and shopping patterns.",
    "pricing": "$199-1999/month",
    "tags": ["Retail Analytics", "Customer Insights", "Behavior Analysis"],
    "url": "https://www.shopperinsight.ai",
    "favicon": "https://www.shopperinsight.ai/favicon.ico"
  },

  // AI for Manufacturing - Supply Chain Optimization
  {
    "id": "mfg-sco-001",
    "name": "ChainOptimize",
    "category": "AI for Manufacturing",
    "subcategory": "Supply Chain Optimization",
    "rating": 4.7,
    "description": "AI solution for optimizing manufacturing supply chains and reducing costs.",
    "pricing": "$999-9999/month",
    "tags": ["Supply Chain", "Logistics", "Manufacturing"],
    "url": "https://www.chainoptimize.ai",
    "favicon": "https://www.chainoptimize.ai/favicon.ico"
  },

  // AI for Transportation - Autonomous Vehicles
  {
    "id": "trans-av-001",
    "name": "AutoPilot AI",
    "category": "AI for Transportation",
    "subcategory": "Autonomous Vehicles",
    "rating": 4.8,
    "description": "Advanced AI system for autonomous vehicle navigation and control.",
    "pricing": "Contact for pricing",
    "tags": ["Self-Driving Cars", "Autonomous Tech", "Transportation"],
    "url": "https://www.autopilotai.tech",
    "favicon": "https://www.autopilotai.tech/favicon.ico"
  },

  // AI for Real Estate - Virtual Tours
  {
    "id": "re-vt-001",
    "name": "TourVision AI",
    "category": "AI for Real Estate",
    "subcategory": "Virtual Tours",
    "rating": 4.6,
    "description": "AI-powered virtual tour platform for real estate properties.",
    "pricing": "$49-499/month",
    "tags": ["Virtual Reality", "Real Estate Tech", "Property Tours"],
    "url": "https://www.tourvision.ai",
    "favicon": "https://www.tourvision.ai/favicon.ico"
  },

  // AI for Agriculture - Precision Farming
  {
    "id": "agri-pf-001",
    "name": "AgriPrecision",
    "category": "AI for Agriculture",
    "subcategory": "Precision Farming",
    "rating": 4.7,
    "description": "AI-driven precision farming solution for optimizing crop yields.",
    "pricing": "$99-999/month",
    "tags": ["Precision Agriculture", "Smart Farming", "Crop Optimization"],
    "url": "https://www.agriprecision.ai",
    "favicon": "https://www.agriprecision.ai/favicon.ico"
  },

  // AI for Energy - Renewable Energy Optimization
  {
    "id": "energy-reo-001",
    "name": "RenewAI",
    "category": "AI for Energy",
    "subcategory": "Renewable Energy Optimization",
    "rating": 4.7,
    "description": "AI platform for optimizing renewable energy production and distribution.",
    "pricing": "$999-9999/month",
    "tags": ["Renewable Energy", "Sustainability", "Energy Management"],
    "url": "https://www.renewai.energy",
    "favicon": "https://www.renewai.energy/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-001",
    "name": "CaseMind",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "AI-powered legal research platform that analyzes case law and legal documents.",
    "pricing": "$99-999/month",
    "tags": ["Legal Research", "Case Law Analysis", "Legal Tech"],
    "url": "https://www.casemind.legal",
    "favicon": "https://www.casemind.legal/favicon.ico"
  },

  // AI for E-commerce - Dynamic Pricing
  {
    "id": "ecom-dp-001",
    "name": "PricePulse",
    "category": "AI for E-commerce",
    "subcategory": "Dynamic Pricing",
    "rating": 4.7,
    "description": "AI-driven dynamic pricing solution that optimizes prices in real-time.",
    "pricing": "$199-1999/month",
    "tags": ["Dynamic Pricing", "E-commerce", "Price Optimization"],
    "url": "https://www.pricepulse.ai",
    "favicon": "https://www.pricepulse.ai/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-001",
    "name": "ModerateAI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.6,
    "description": "AI-powered content moderation platform for filtering inappropriate content.",
    "pricing": "$0.01-0.10/image",
    "tags": ["Content Moderation", "AI Safety", "Media Management"],
    "url": "https://www.moderateai.media",
    "favicon": "https://www.moderateai.media/favicon.ico"
  },

  // AI for Gaming - Procedural Content Generation
  {
    "id": "gaming-pcg-001",
    "name": "ProceduralGen",
    "category": "AI for Gaming",
    "subcategory": "Procedural Content Generation",
    "rating": 4.7,
    "description": "AI tool for generating game content procedurally, including levels and environments.",
    "pricing": "$99-999/month",
    "tags": ["Game Development", "Procedural Generation", "Game Design"],
    "url": "https://www.proceduralgen.games",
    "favicon": "https://www.proceduralgen.games/favicon.ico"
  },

  // AI for Fashion - Trend Forecasting
  {
    "id": "fashion-tf-001",
    "name": "TrendSight",
    "category": "AI for Fashion",
    "subcategory": "Trend Forecasting",
    "rating": 4.7,
    "description": "AI-powered trend forecasting for the fashion industry.",
    "pricing": "$299-2999/month",
    "tags": ["Fashion Trends", "Market Analysis", "Retail Insights"],
    "url": "https://www.trendsight.fashion",
    "favicon": "https://www.trendsight.fashion/favicon.ico"
  },

  // AI for Insurance - Risk Assessment
  {
    "id": "insurance-ra-001",
    "name": "RiskAI",
    "category": "AI for Insurance",
    "subcategory": "Risk Assessment",
    "rating": 4.8,
    "description": "AI-powered risk assessment platform for insurance underwriting.",
    "pricing": "Contact for pricing",
    "tags": ["Risk Analysis", "Insurance Underwriting", "AI Insurance"],
    "url": "https://www.riskai.insure",
    "favicon": "https://www.riskai.insure/favicon.ico"
  },

  // AI for Music - Mastering & Mixing
  {
    "id": "music-mm-001",
    "name": "MasterMind",
    "category": "AI for Music",
    "subcategory": "Mastering & Mixing",
    "rating": 4.7,
    "description": "AI-powered audio mastering and mixing tool for professional-quality results.",
    "pricing": "$9.99-49.99/month",
    "tags": ["Audio Mastering", "Music Production", "Audio Engineering"],
    "url": "https://www.mastermind.audio",
    "favicon": "https://www.mastermind.audio/favicon.ico"
  },

  // AI for Fitness - Form Correction
  {
    "id": "fitness-fc-001",
    "name": "FormCheck",
    "category": "AI for Fitness",
    "subcategory": "Form Correction",
    "rating": 4.6,
    "description": "AI-powered form correction for workouts and exercises.",
    "pricing": "$14.99-29.99/month",
    "tags": ["Exercise Form", "Workout Safety", "Fitness Tech"],
    "url": "https://www.formcheck.fit",
    "favicon": "https://www.formcheck.fit/favicon.ico"
  },

  // AI for Travel - Price Prediction
  {
    "id": "travel-pp-001",
    "name": "FareMind",
    "category": "AI for Travel",
    "subcategory": "Price Prediction",
    "rating": 4.6,
    "description": "AI tool that predicts the best time to book flights and hotels.",
    "pricing": "Free - $9.99/month",
    "tags": ["Price Prediction", "Travel Deals", "Booking Assistant"],
    "url": "https://www.faremind.travel",
    "favicon": "https://www.faremind.travel/favicon.ico"
  },

  // AI for Mental Health - Mood Tracking
  {
    "id": "mhealth-mt-001",
    "name": "MoodTrack",
    "category": "AI for Mental Health",
    "subcategory": "Mood Tracking",
    "rating": 4.6,
    "description": "AI-powered mood tracking and mental wellness journal.",
    "pricing": "Free - $4.99/month",
    "tags": ["Mental Health", "Mood Analysis", "Wellness Tracking"],
    "url": "https://www.moodtrack.app",
    "favicon": "https://www.moodtrack.app/favicon.ico"
  },

  // AI for Legal - Document Automation
  {
    "id": "legal-da-001",
    "name": "DocuAuto",
    "category": "AI for Legal",
    "subcategory": "Document Automation",
    "rating": 4.7,
    "description": "AI-powered document automation for legal professionals, streamlining contract and agreement creation.",
    "pricing": "$49-499/month",
    "tags": ["Legal Tech", "Document Generation", "Automation"],
    "url": "https://www.docuauto.legal",
    "favicon": "https://www.docuauto.legal/favicon.ico"
  },

  // AI for E-commerce - Chat Support
  {
    "id": "ecom-cs-001",
    "name": "ShopAssist AI",
    "category": "AI for E-commerce",
    "subcategory": "Chat Support",
    "rating": 4.6,
    "description": "24/7 AI chat support for e-commerce websites, handling customer inquiries and boosting sales.",
    "pricing": "$29-299/month",
    "tags": ["Customer Support", "Chatbot", "E-commerce"],
    "url": "https://www.shopassist.ai",
    "favicon": "https://www.shopassist.ai/favicon.ico"
  },

  // AI for Media - Automated Captioning
  {
    "id": "media-ac-001",
    "name": "CaptionAI",
    "category": "AI for Media",
    "subcategory": "Automated Captioning",
    "rating": 4.7,
    "description": "AI-powered automated captioning for videos with high accuracy and multiple language support.",
    "pricing": "$0.10-1.00/minute",
    "tags": ["Accessibility", "Video Production", "Subtitles"],
    "url": "https://www.captionai.media",
    "favicon": "https://www.captionai.media/favicon.ico"
  },

  // AI for Gaming - Player Behavior Analysis
  {
    "id": "gaming-pba-001",
    "name": "PlayerInsight",
    "category": "AI for Gaming",
    "subcategory": "Player Behavior Analysis",
    "rating": 4.8,
    "description": "AI analytics platform that tracks and analyzes player behavior to improve game design.",
    "pricing": "$99-999/month",
    "tags": ["Game Analytics", "Player Engagement", "Game Design"],
    "url": "https://www.playerinsight.games",
    "favicon": "https://www.playerinsight.games/favicon.ico"
  },

  // AI for Fashion - Size & Fit Prediction
  {
    "id": "fashion-sf-001",
    "name": "PerfectFit AI",
    "category": "AI for Fashion",
    "subcategory": "Size & Fit Prediction",
    "rating": 4.7,
    "description": "AI-powered size and fit recommendation engine to reduce returns and improve customer satisfaction.",
    "pricing": "$199-1999/month",
    "tags": ["Fashion Tech", "Size Prediction", "E-commerce"],
    "url": "https://www.perfectfit.ai",
    "favicon": "https://www.perfectfit.ai/favicon.ico"
  },

  // AI for Insurance - Fraud Detection
  {
    "id": "insurance-fd-001",
    "name": "FraudShield Pro",
    "category": "AI for Insurance",
    "subcategory": "Fraud Detection",
    "rating": 4.9,
    "description": "Advanced AI system for detecting and preventing insurance fraud in real-time.",
    "pricing": "Contact for pricing",
    "tags": ["Insurance Tech", "Fraud Prevention", "Risk Management"],
    "url": "https://www.fraudshieldpro.insure",
    "favicon": "https://www.fraudshieldpro.insure/favicon.ico"
  },

  // AI for Music - Vocal Processing
  {
    "id": "music-vp-001",
    "name": "VocalAI",
    "category": "AI for Music",
    "subcategory": "Vocal Processing",
    "rating": 4.7,
    "description": "AI-powered vocal processing tools for pitch correction, harmony generation, and vocal effects.",
    "pricing": "$9.99-49.99/month",
    "tags": ["Vocal Effects", "Music Production", "Audio Processing"],
    "url": "https://www.vocalai.music",
    "favicon": "https://www.vocalai.music/favicon.ico"
  },

  // AI for Fitness - Nutrition Planning
  {
    "id": "fitness-np-001",
    "name": "NutriAI",
    "category": "AI for Fitness",
    "subcategory": "Nutrition Planning",
    "rating": 4.6,
    "description": "AI-powered nutrition planning that creates personalized meal plans based on fitness goals.",
    "pricing": "$9.99-29.99/month",
    "tags": ["Meal Planning", "Nutrition", "Health Tech"],
    "url": "https://www.nutriai.fit",
    "favicon": "https://www.nutriai.fit/favicon.ico"
  },

  // AI for Travel - Itinerary Optimization
  {
    "id": "travel-io-001",
    "name": "Itinera",
    "category": "AI for Travel",
    "subcategory": "Itinerary Optimization",
    "rating": 4.7,
    "description": "AI-powered travel itinerary optimizer that creates perfect trip schedules based on preferences.",
    "pricing": "$4.99-19.99/month",
    "tags": ["Travel Planning", "Trip Optimization", "Itinerary Builder"],
    "url": "https://www.itinera.travel",
    "favicon": "https://www.itinera.travel/favicon.ico"
  },

  // AI for Mental Health - Crisis Intervention
  {
    "id": "mhealth-ci-001",
    "name": "CrisisGuard",
    "category": "AI for Mental Health",
    "subcategory": "Crisis Intervention",
    "rating": 4.9,
    "description": "AI-powered crisis intervention system that provides immediate support and resources.",
    "pricing": "Free",
    "tags": ["Crisis Support", "Mental Health", "Emergency Response"],
    "url": "https://www.crisisguard.health",
    "favicon": "https://www.crisisguard.health/favicon.ico"
  },

  // AI for Legal - Compliance Monitoring
  {
    "id": "legal-cm-001",
    "name": "ComplyAI",
    "category": "AI for Legal",
    "subcategory": "Compliance Monitoring",
    "rating": 4.8,
    "description": "AI-powered compliance monitoring system that tracks regulatory changes and ensures organizational compliance.",
    "pricing": "$299-2999/month",
    "tags": ["Regulatory Compliance", "Legal Tech", "Risk Management"],
    "url": "https://www.complyai.legal",
    "favicon": "https://www.complyai.legal/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-001",
    "name": "StockWise",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$99-999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.shop",
    "favicon": "https://www.stockwise.shop/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-001",
    "name": "AudioAI",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "AI-powered audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$9.99-99.99/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioai.media",
    "favicon": "https://www.audioai.media/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-001",
    "name": "TestBot AI",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.6,
    "description": "AI-powered automated game testing platform that finds bugs and performance issues.",
    "pricing": "$199-1999/month",
    "tags": ["Game Development", "Quality Assurance", "Automated Testing"],
    "url": "https://www.testbot.games",
    "favicon": "https://www.testbot.games/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-001",
    "name": "EcoFashion AI",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.7,
    "description": "AI platform that helps fashion brands find sustainable materials and ethical suppliers.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.ai",
    "favicon": "https://www.ecofashion.ai/favicon.ico"
  },

  // AI for Insurance - Customer Onboarding
  {
    "id": "insurance-co-001",
    "name": "OnboardAI",
    "category": "AI for Insurance",
    "subcategory": "Customer Onboarding",
    "rating": 4.6,
    "description": "AI-powered customer onboarding platform that streamlines the insurance application process.",
    "pricing": "Contact for pricing",
    "tags": ["Customer Experience", "Insurance Tech", "Digital Onboarding"],
    "url": "https://www.onboardai.insure",
    "favicon": "https://www.onboardai.insure/favicon.ico"
  },

  // AI for Music - Royalty Management
  {
    "id": "music-rm-001",
    "name": "RoyaltyAI",
    "category": "AI for Music",
    "subcategory": "Royalty Management",
    "rating": 4.7,
    "description": "AI-powered royalty tracking and management platform for musicians and labels.",
    "pricing": "5-15% of royalties managed",
    "tags": ["Music Royalties", "Copyright Management", "Music Business"],
    "url": "https://www.royaltyai.music",
    "favicon": "https://www.royaltyai.music/favicon.ico"
  },

  // AI for Fitness - Injury Prevention
  {
    "id": "fitness-ip-001",
    "name": "InjuryGuard",
    "category": "AI for Fitness",
    "subcategory": "Injury Prevention",
    "rating": 4.8,
    "description": "AI-powered system that analyzes movement patterns to prevent workout-related injuries.",
    "pricing": "$14.99-39.99/month",
    "tags": ["Injury Prevention", "Movement Analysis", "Fitness Safety"],
    "url": "https://www.injuryguard.fit",
    "favicon": "https://www.injuryguard.fit/favicon.ico"
  },

  // AI for Travel - Local Experience
  {
    "id": "travel-le-001",
    "name": "LocalAI",
    "category": "AI for Travel",
    "subcategory": "Local Experience",
    "rating": 4.6,
    "description": "AI travel assistant that connects travelers with authentic local experiences and hidden gems.",
    "pricing": "Free - $9.99/month",
    "tags": ["Local Travel", "Experience Discovery", "Tourism"],
    "url": "https://www.localai.travel",
    "favicon": "https://www.localai.travel/favicon.ico"
  },

  // AI for Mental Health - Sleep Improvement
  {
    "id": "mhealth-si-001",
    "name": "DreamAI",
    "category": "AI for Mental Health",
    "subcategory": "Sleep Improvement",
    "rating": 4.7,
    "description": "AI-powered sleep improvement platform that analyzes sleep patterns and provides personalized recommendations.",
    "pricing": "$4.99-14.99/month",
    "tags": ["Sleep Tracking", "Wellness", "Mental Health"],
    "url": "https://www.dreamai.health",
    "favicon": "https://www.dreamai.health/favicon.ico"
  },

  // AI for Legal - Document Review
  {
    "id": "legal-dr-001",
    "name": "DocuReview AI",
    "category": "AI for Legal",
    "subcategory": "Document Review",
    "rating": 4.8,
    "description": "AI-powered document review platform that automates the analysis of legal documents for accuracy and compliance.",
    "pricing": "$199-1999/month",
    "tags": ["Legal Tech", "Document Analysis", "Compliance"],
    "url": "https://www.docureview.ai",
    "favicon": "https://www.docureview.ai/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-001",
    "name": "CaseInsight",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.7,
    "description": "Advanced analytics platform that provides insights into case law, judge rulings, and legal trends.",
    "pricing": "$299-2499/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.legal",
    "favicon": "https://www.caseinsight.legal/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-001",
    "name": "ShopAssist Pro",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.shopassist.pro",
    "favicon": "https://www.shopassist.pro/favicon.ico"
  },

  // AI for E-commerce - Visual Search
  {
    "id": "ecom-vs-003",
    "name": "SnapFind Pro",
    "category": "AI for E-commerce",
    "subcategory": "Visual Search",
    "rating": 4.7,
    "description": "Advanced visual search technology that helps customers find products using images.",
    "pricing": "$149-1499/month",
    "tags": ["Image Recognition", "Visual Search", "E-commerce"],
    "url": "https://www.snapfind.pro",
    "favicon": "https://www.snapfind.pro/favicon.ico"
  },

  // AI for Media - Content Generation
  {
    "id": "media-cg-001",
    "name": "ContentGenie",
    "category": "AI for Media",
    "subcategory": "Content Generation",
    "rating": 4.6,
    "description": "AI-powered content creation platform that generates articles, blogs, and social media posts.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Social Media"],
    "url": "https://www.contentgenie.media",
    "favicon": "https://www.contentgenie.media/favicon.ico"
  },

  // AI for Media - Video Analytics
  {
    "id": "media-va-001",
    "name": "VidMetrics",
    "category": "AI for Media",
    "subcategory": "Video Analytics",
    "rating": 4.5,
    "description": "Comprehensive video analytics platform that provides insights into viewer engagement and behavior.",
    "pricing": "$99-999/month",
    "tags": ["Video Analytics", "Viewer Engagement", "Content Performance"],
    "url": "https://www.vidmetrics.ai",
    "favicon": "https://www.vidmetrics.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-001",
    "name": "WorldForge",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.7,
    "description": "AI-powered procedural generation tool for creating vast, dynamic game worlds.",
    "pricing": "$199-1999/month",
    "tags": ["Game Development", "Procedural Generation", "Game Design"],
    "url": "https://www.worldforge.games",
    "favicon": "https://www.worldforge.games/favicon.ico"
  },

  // AI for Gaming - Player Behavior Analysis
  {
    "id": "gaming-pba-001",
    "name": "PlayIQ",
    "category": "AI for Gaming",
    "subcategory": "Player Behavior Analysis",
    "rating": 4.6,
    "description": "Advanced analytics platform that tracks and analyzes player behavior in games.",
    "pricing": "$299-2999/month",
    "tags": ["Game Analytics", "Player Behavior", "Game Design"],
    "url": "https://www.playiq.ai",
    "favicon": "https://www.playiq.ai/favicon.ico"
  },

  // AI for Fashion - Virtual Styling
  {
    "id": "fashion-vs-001",
    "name": "StyleAI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Styling",
    "rating": 4.7,
    "description": "AI-powered virtual stylist that recommends outfits based on personal style and occasion.",
    "pricing": "$9.99-99.99/month",
    "tags": ["Fashion Tech", "Virtual Styling", "Personal Shopping"],
    "url": "https://www.styleai.fashion",
    "favicon": "https://www.styleai.fashion/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-001",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.6,
    "description": "AI-powered trend forecasting platform that predicts upcoming fashion trends.",
    "pricing": "$499-4999/month",
    "tags": ["Fashion Forecasting", "Trend Analysis", "Retail"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Insurance - Claims Automation
  {
    "id": "insurance-ca-001",
    "name": "ClaimBot",
    "category": "AI for Insurance",
    "subcategory": "Claims Automation",
    "rating": 4.7,
    "description": "AI-powered claims automation platform that streamlines the insurance claims process.",
    "pricing": "Contact for pricing",
    "tags": ["Claims Processing", "Insurance Tech", "Automation"],
    "url": "https://www.claimbot.insure",
    "favicon": "https://www.claimbot.insure/favicon.ico"
  },

  // AI for Insurance - Risk Assessment
  {
    "id": "insurance-ra-002",
    "name": "RiskAware",
    "category": "AI for Insurance",
    "subcategory": "Risk Assessment",
    "rating": 4.8,
    "description": "Advanced AI platform for comprehensive risk assessment in the insurance industry.",
    "pricing": "$999-9999/month",
    "tags": ["Risk Management", "Insurance Analytics", "Underwriting"],
    "url": "https://www.riskaware.insure",
    "favicon": "https://www.riskaware.insure/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-002",
    "name": "CaseLaw AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI platform for comprehensive legal research and case law analysis.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.caselaw.ai",
    "favicon": "https://www.caselaw.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-002",
    "name": "ContractMind Pro",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies risks and extracts key clauses.",
    "pricing": "$199-1999/month",
    "tags": ["Contract Review", "Legal Tech", "Risk Assessment"],
    "url": "https://www.contractmind.pro",
    "favicon": "https://www.contractmind.pro/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-001",
    "name": "ShopGenie",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.6,
    "description": "AI-powered recommendation engine that boosts sales through personalized product suggestions.",
    "pricing": "$99-999/month",
    "tags": ["Recommendation Engine", "E-commerce", "Personalization"],
    "url": "https://www.shopgenie.ai",
    "favicon": "https://www.shopgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Optimization
  {
    "id": "ecom-io-001",
    "name": "StockSense AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Optimization",
    "rating": 4.7,
    "description": "AI-driven inventory management system that predicts demand and optimizes stock levels.",
    "pricing": "$149-1499/month",
    "tags": ["Inventory Management", "Supply Chain", "E-commerce"],
    "url": "https://www.stocksense.ai",
    "favicon": "https://www.stocksense.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-003",
    "name": "EditFlow AI",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.7,
    "description": "AI-powered video editing platform that automates the editing process with professional results.",
    "pricing": "$29-299/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.ai",
    "favicon": "https://www.editflow.ai/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-002",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$199-1999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-003",
    "name": "AINPC",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic and adaptive non-player characters in games.",
    "pricing": "$299-2999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.games",
    "favicon": "https://www.ainpc.games/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-002",
    "name": "TestBot Pro",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.6,
    "description": "Professional AI-powered game testing platform that finds bugs and performance issues.",
    "pricing": "$399-3999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.pro",
    "favicon": "https://www.testbot.pro/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-003",
    "name": "FitVision",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Advanced virtual try-on technology that lets customers see how clothes fit before buying.",
    "pricing": "$199-1999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.fitvision.ai",
    "favicon": "https://www.fitvision.ai/favicon.ico"
  },

  // AI for Fashion - Trend Analysis
  {
    "id": "fashion-ta-001",
    "name": "StyleTrend AI",
    "category": "AI for Fashion",
    "subcategory": "Trend Analysis",
    "rating": 4.6,
    "description": "AI-powered trend analysis platform that identifies and predicts fashion trends.",
    "pricing": "$499-4999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.styletrend.ai",
    "favicon": "https://www.styletrend.ai/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-001",
    "name": "eDiscover AI",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.8,
    "description": "AI-powered eDiscovery platform that automates document review and evidence collection for legal cases.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Legal Tech", "Document Review"],
    "url": "https://www.ediscover.ai",
    "favicon": "https://www.ediscover.ai/favicon.ico"
  },

  // AI for Legal - Legal Drafting
  {
    "id": "legal-ld-001",
    "name": "DraftPro AI",
    "category": "AI for Legal",
    "subcategory": "Legal Drafting",
    "rating": 4.7,
    "description": "AI assistant that helps legal professionals draft and review legal documents with accuracy and efficiency.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Drafting", "Document Automation", "Legal Tech"],
    "url": "https://www.draftpro.ai",
    "favicon": "https://www.draftpro.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-001",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization platform that helps e-commerce businesses maximize profits through dynamic pricing.",
    "pricing": "$199-1999/month",
    "tags": ["Pricing Strategy", "E-commerce", "Revenue Optimization"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Segmentation
  {
    "id": "ecom-cs-002",
    "name": "SegmentAI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Segmentation",
    "rating": 4.6,
    "description": "Advanced customer segmentation tool that uses AI to identify and target specific customer groups.",
    "pricing": "$149-1499/month",
    "tags": ["Customer Analytics", "Marketing Automation", "E-commerce"],
    "url": "https://www.segmentai.shop",
    "favicon": "https://www.segmentai.shop/favicon.ico"
  },

  // AI for Media - Audio Transcription
  {
    "id": "media-at-001",
    "name": "TranscribeAI",
    "category": "AI for Media",
    "subcategory": "Audio Transcription",
    "rating": 4.7,
    "description": "AI-powered audio transcription service that converts speech to text with high accuracy.",
    "pricing": "$0.10-0.50/minute",
    "tags": ["Transcription", "Speech-to-Text", "Content Creation"],
    "url": "https://www.transcribeai.media",
    "favicon": "https://www.transcribeai.media/favicon.ico"
  },

  // AI for Media - Image Enhancement
  {
    "id": "media-ie-001",
    "name": "PhotoGenius AI",
    "category": "AI for Media",
    "subcategory": "Image Enhancement",
    "rating": 4.8,
    "description": "AI-powered image enhancement tool that improves photo quality and resolution.",
    "pricing": "$9.99-99.99/month",
    "tags": ["Photo Editing", "Image Enhancement", "AI Photography"],
    "url": "https://www.photogenius.ai",
    "favicon": "https://www.photogenius.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Content Generation
  {
    "id": "gaming-pcg-002",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Content Generation",
    "rating": 4.7,
    "description": "Advanced procedural content generation tool for creating vast, dynamic game worlds and assets.",
    "pricing": "$399-3999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-001",
    "name": "PlayerInsight Pro",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.6,
    "description": "Comprehensive player analytics platform that provides insights into player behavior and engagement.",
    "pricing": "$299-2999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.pro",
    "favicon": "https://www.playerinsight.pro/favicon.ico"
  },

  // AI for Fashion - Size & Fit Prediction
  {
    "id": "fashion-sf-001",
    "name": "PerfectFit AI",
    "category": "AI for Fashion",
    "subcategory": "Size & Fit Prediction",
    "rating": 4.7,
    "description": "AI-powered size and fit prediction tool that reduces returns and improves customer satisfaction.",
    "pricing": "$199-1999/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.perfectfit.ai",
    "favicon": "https://www.perfectfit.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-002",
    "name": "EcoSource AI",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecosource.ai",
    "favicon": "https://www.ecosource.ai/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-003",
    "name": "LexiResearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "AI-powered legal research platform that provides comprehensive case law and statute analysis.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexiresearch.ai",
    "favicon": "https://www.lexiresearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-003",
    "name": "ContractMind Pro",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "Advanced AI tool for contract analysis, risk assessment, and clause identification.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Risk Assessment"],
    "url": "https://www.contractmind.pro",
    "favicon": "https://www.contractmind.pro/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-002",
    "name": "ShopGenie Pro",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "Advanced AI recommendation engine that boosts sales through hyper-personalized product suggestions.",
    "pricing": "$199-1999/month",
    "tags": ["Recommendation Engine", "E-commerce", "Personalization"],
    "url": "https://www.shopgenie.pro",
    "favicon": "https://www.shopgenie.pro/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-002",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.6,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$149-1499/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-001",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality articles, blogs, and social media posts.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Social Media"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-004",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-004",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating highly realistic and adaptive non-player characters.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-003",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "Elite AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-004",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Advanced virtual try-on technology that provides realistic clothing visualization for online shoppers.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-002",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "Advanced AI platform for predicting and analyzing fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-002",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-002",
    "name": "eDiscovery AI",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.ai",
    "favicon": "https://www.ediscovery.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-003",
    "name": "SupportBot AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportbot.ai",
    "favicon": "https://www.supportbot.ai/favicon.ico"
  },

  // AI for E-commerce - Visual Search
  {
    "id": "ecom-vs-004",
    "name": "VisionSearch AI",
    "category": "AI for E-commerce",
    "subcategory": "Visual Search",
    "rating": 4.7,
    "description": "Advanced visual search technology that helps customers find products using images.",
    "pricing": "$199-1999/month",
    "tags": ["Visual Search", "Image Recognition", "E-commerce"],
    "url": "https://www.visionsearch.ai",
    "favicon": "https://www.visionsearch.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-002",
    "name": "AudioEnhance AI",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "AI-powered audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$19-199/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioenhance.ai",
    "favicon": "https://www.audioenhance.ai/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-003",
    "name": "SafeContent AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safecontent.ai",
    "favicon": "https://www.safecontent.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-003",
    "name": "WorldForge AI",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.7,
    "description": "AI-powered procedural generation tool for creating vast, dynamic game worlds and assets.",
    "pricing": "$499-4999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.ai",
    "favicon": "https://www.worldforge.ai/favicon.ico"
  },

  // AI for Gaming - Player Behavior Analysis
  {
    "id": "gaming-pba-002",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Behavior Analysis",
    "rating": 4.6,
    "description": "Advanced player behavior analysis platform that provides insights into player engagement and retention.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-001",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit.",
    "pricing": "$199-1999/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-003",
    "name": "EcoFashion AI",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$599-5999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.ai",
    "favicon": "https://www.ecofashion.ai/favicon.ico"
  },

  // AI for Legal - Contract Review
  {
    "id": "legal-cr-001",
    "name": "ReviewAI Legal",
    "category": "AI for Legal",
    "subcategory": "Contract Review",
    "rating": 4.8,
    "description": "AI-powered contract review platform that identifies risks and suggests improvements in legal documents.",
    "pricing": "$299-2999/month",
    "tags": ["Contract Analysis", "Legal Tech", "Risk Assessment"],
    "url": "https://www.reviewai.legal",
    "favicon": "https://www.reviewai.legal/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-004",
    "name": "LegalMind AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.7,
    "description": "Advanced AI platform for comprehensive legal research and case law analysis.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.legalmind.ai",
    "favicon": "https://www.legalmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-004",
    "name": "SupportGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.7,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$149-1499/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenius.ai",
    "favicon": "https://www.supportgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-003",
    "name": "StockSense Pro",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.6,
    "description": "Advanced AI-powered inventory management system that optimizes stock levels and reduces costs.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stocksense.pro",
    "favicon": "https://www.stocksense.pro/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-002",
    "name": "ContentForge AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$39-399/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentforge.ai",
    "favicon": "https://www.contentforge.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-005",
    "name": "EditMaster AI",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation and enhancement features.",
    "pricing": "$59-599/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editmaster.ai",
    "favicon": "https://www.editmaster.ai/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-005",
    "name": "AINPC Elite",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.8,
    "description": "Elite AI system for creating highly realistic, adaptive, and intelligent non-player characters.",
    "pricing": "$599-5999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpcelite.games",
    "favicon": "https://www.ainpcelite.games/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-004",
    "name": "TestBot Pro Max",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "Premium AI-powered game testing platform that identifies even the most subtle bugs and performance issues.",
    "pricing": "$699-6999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.promax",
    "favicon": "https://www.testbot.promax/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-005",
    "name": "StyleVision AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.8,
    "description": "Cutting-edge virtual try-on technology that provides hyper-realistic clothing visualization.",
    "pricing": "$399-3999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylevision.ai",
    "favicon": "https://www.stylevision.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-003",
    "name": "TrendSight Elite",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "Elite AI platform for predicting and analyzing fashion trends with unparalleled accuracy.",
    "pricing": "$799-7999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.elite",
    "favicon": "https://www.trendsight.elite/favicon.ico"
  },

  // AI for Legal - Document Automation
  {
    "id": "legal-da-001",
    "name": "DocuFlow AI",
    "category": "AI for Legal",
    "subcategory": "Document Automation",
    "rating": 4.7,
    "description": "AI-powered document automation platform that streamlines legal document creation and management.",
    "pricing": "$349-3499/month",
    "tags": ["Document Automation", "Legal Tech", "Workflow Optimization"],
    "url": "https://www.docuflow.ai",
    "favicon": "https://www.docuflow.ai/favicon.ico"
  },

  // AI for Legal - Compliance Monitoring
  {
    "id": "legal-cm-001",
    "name": "ComplyGuard AI",
    "category": "AI for Legal",
    "subcategory": "Compliance Monitoring",
    "rating": 4.8,
    "description": "AI-driven compliance monitoring solution that ensures regulatory adherence and risk mitigation.",
    "pricing": "$499-4999/month",
    "tags": ["Compliance", "Risk Management", "Regulatory Tech"],
    "url": "https://www.complyguard.ai",
    "favicon": "https://www.complyguard.ai/favicon.ico"
  },

  // AI for E-commerce - Dynamic Pricing
  {
    "id": "ecom-dp-002",
    "name": "PricePulse AI",
    "category": "AI for E-commerce",
    "subcategory": "Dynamic Pricing",
    "rating": 4.7,
    "description": "AI-powered dynamic pricing solution that optimizes prices in real-time for maximum profitability.",
    "pricing": "$299-2999/month",
    "tags": ["Dynamic Pricing", "Pricing Strategy", "E-commerce"],
    "url": "https://www.pricepulse.ai",
    "favicon": "https://www.pricepulse.ai/favicon.ico"
  },

  // AI for E-commerce - Visual Search
  {
    "id": "ecom-vs-003",
    "name": "VisionSearch Pro",
    "category": "AI for E-commerce",
    "subcategory": "Visual Search",
    "rating": 4.8,
    "description": "Advanced visual search technology that enhances product discovery and customer experience.",
    "pricing": "$249-2499/month",
    "tags": ["Visual Search", "Image Recognition", "E-commerce"],
    "url": "https://www.visionsearch.pro",
    "favicon": "https://www.visionsearch.pro/favicon.ico"
  },

  // AI for Media - Audio Production
  {
    "id": "media-ap-001",
    "name": "SoundForge AI",
    "category": "AI for Media",
    "subcategory": "Audio Production",
    "rating": 4.7,
    "description": "AI-powered audio production suite for professional-grade sound design and mastering.",
    "pricing": "$79-799/month",
    "tags": ["Audio Production", "Sound Design", "Music Production"],
    "url": "https://www.soundforge.ai",
    "favicon": "https://www.soundforge.ai/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-004",
    "name": "ContentShield AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "Comprehensive AI-powered content moderation platform for safe and compliant user-generated content.",
    "pricing": "$349-3499/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.contentshield.ai",
    "favicon": "https://www.contentshield.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Content
  {
    "id": "gaming-pc-004",
    "name": "WorldBuilder AI",
    "category": "AI for Gaming",
    "subcategory": "Procedural Content",
    "rating": 4.8,
    "description": "Advanced AI system for generating vast, detailed game worlds and environments procedurally.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldbuilder.ai",
    "favicon": "https://www.worldbuilder.ai/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-003",
    "name": "GameInsight Pro",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$449-4499/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.gameinsight.pro",
    "favicon": "https://www.gameinsight.pro/favicon.ico"
  },

  // AI for Fashion - Size & Fit
  {
    "id": "fashion-sf-003",
    "name": "PerfectFit AI",
    "category": "AI for Fashion",
    "subcategory": "Size & Fit",
    "rating": 4.7,
    "description": "AI-powered size and fit recommendation system that reduces returns and improves customer satisfaction.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.perfectfit.ai",
    "favicon": "https://www.perfectfit.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-004",
    "name": "EcoStyle AI",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecostyle.ai",
    "favicon": "https://www.ecostyle.ai/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-001",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-001",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-001",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-001",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-001",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-001",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-001",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-001",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-001",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-001",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-001",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-001",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-001",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-001",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-001",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-001",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-001",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-001",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-001",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-001",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-002",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-002",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-002",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-002",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-002",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-002",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-002",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-002",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-002",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-002",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-003",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-003",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-002",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-002",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-002",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-002",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-002",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-002",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-002",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-002",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-004",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-004",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-004",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-004",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-004",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-004",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-004",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-004",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-004",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-004",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-005",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-005",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-003",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-003",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-003",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-003",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-003",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-003",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-003",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-003",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-006",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-006",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-005",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-005",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-005",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-005",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-005",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-005",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-005",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-005",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-007",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-007",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-004",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-004",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-004",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-004",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-004",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-004",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-004",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-004",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-009",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-009",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-007",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-007",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-007",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-007",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-007",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-007",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-007",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-007",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-010",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-010",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-008",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-008",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-008",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-008",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-008",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-008",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-008",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-008",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-011",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-011",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-009",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-009",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-009",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-009",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-009",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-009",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-009",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-009",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-012",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-012",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-010",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-010",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-010",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-010",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-010",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-010",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-010",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-010",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-013",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-013",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-011",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-011",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-011",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-011",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-011",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-011",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-011",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-011",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-015",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-015",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-013",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-013",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-013",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-013",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-013",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-013",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-013",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-013",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-016",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-016",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-014",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-014",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-014",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-014",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-014",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-014",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-014",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-014",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-017",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-017",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-015",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-015",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-015",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-015",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-015",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-015",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-015",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-015",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-018",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-018",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-016",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-016",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-016",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-016",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-016",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-016",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-016",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-016",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-019",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-019",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-017",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-017",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-017",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-017",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-017",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-017",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-017",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-017",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-020",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-020",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-018",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-018",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-018",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-018",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-018",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-018",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-018",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-018",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  },

  // AI for Legal - Legal Analytics
  {
    "id": "legal-la-021",
    "name": "CaseInsight Pro",
    "category": "AI for Legal",
    "subcategory": "Legal Analytics",
    "rating": 4.8,
    "description": "Advanced legal analytics platform that provides deep insights into case law and legal trends.",
    "pricing": "$399-3999/month",
    "tags": ["Legal Analytics", "Case Law", "Legal Research"],
    "url": "https://www.caseinsight.pro",
    "favicon": "https://www.caseinsight.pro/favicon.ico"
  },

  // AI for Legal - eDiscovery
  {
    "id": "legal-ed-021",
    "name": "eDiscovery Master",
    "category": "AI for Legal",
    "subcategory": "eDiscovery",
    "rating": 4.7,
    "description": "Comprehensive eDiscovery platform that automates document review and evidence collection.",
    "pricing": "$499-4999/month",
    "tags": ["eDiscovery", "Document Review", "Legal Tech"],
    "url": "https://www.ediscovery.master",
    "favicon": "https://www.ediscovery.master/favicon.ico"
  },

  // AI for E-commerce - Personalized Recommendations
  {
    "id": "ecom-pr-021",
    "name": "RecGenius AI",
    "category": "AI for E-commerce",
    "subcategory": "Personalized Recommendations",
    "rating": 4.7,
    "description": "AI-powered recommendation engine that delivers personalized product suggestions to boost sales.",
    "pricing": "$199-1999/month",
    "tags": ["Personalization", "Recommendation Engine", "E-commerce"],
    "url": "https://www.recgenius.ai",
    "favicon": "https://www.recgenius.ai/favicon.ico"
  },

  // AI for E-commerce - Pricing Optimization
  {
    "id": "ecom-po-021",
    "name": "PriceMind AI",
    "category": "AI for E-commerce",
    "subcategory": "Pricing Optimization",
    "rating": 4.7,
    "description": "AI-powered pricing optimization tool that helps businesses maximize profits through dynamic pricing.",
    "pricing": "$299-2999/month",
    "tags": ["Pricing Strategy", "Dynamic Pricing", "E-commerce"],
    "url": "https://www.pricemind.ai",
    "favicon": "https://www.pricemind.ai/favicon.ico"
  },

  // AI for Media - Audio Enhancement
  {
    "id": "media-ae-021",
    "name": "AudioForge Pro",
    "category": "AI for Media",
    "subcategory": "Audio Enhancement",
    "rating": 4.7,
    "description": "Professional audio enhancement tool that improves sound quality and removes background noise.",
    "pricing": "$49-499/month",
    "tags": ["Audio Processing", "Noise Reduction", "Sound Enhancement"],
    "url": "https://www.audioforge.pro",
    "favicon": "https://www.audioforge.pro/favicon.ico"
  },

  // AI for Media - Content Moderation
  {
    "id": "media-cm-021",
    "name": "SafeGuard AI",
    "category": "AI for Media",
    "subcategory": "Content Moderation",
    "rating": 4.8,
    "description": "AI-powered content moderation platform that detects and filters inappropriate content in real-time.",
    "pricing": "$299-2999/month",
    "tags": ["Content Moderation", "Community Safety", "AI Filtering"],
    "url": "https://www.safeguard.ai",
    "favicon": "https://www.safeguard.ai/favicon.ico"
  },

  // AI for Gaming - Procedural Generation
  {
    "id": "gaming-pg-021",
    "name": "WorldForge Pro",
    "category": "AI for Gaming",
    "subcategory": "Procedural Generation",
    "rating": 4.8,
    "description": "Advanced procedural generation tool for creating vast, detailed game worlds and environments.",
    "pricing": "$599-5999/month",
    "tags": ["Procedural Generation", "Game Development", "Content Creation"],
    "url": "https://www.worldforge.pro",
    "favicon": "https://www.worldforge.pro/favicon.ico"
  },

  // AI for Gaming - Player Analytics
  {
    "id": "gaming-pa-021",
    "name": "PlayerInsight AI",
    "category": "AI for Gaming",
    "subcategory": "Player Analytics",
    "rating": 4.7,
    "description": "Comprehensive player analytics platform that provides deep insights into player behavior and engagement.",
    "pricing": "$399-3999/month",
    "tags": ["Player Analytics", "Game Analytics", "User Behavior"],
    "url": "https://www.playerinsight.ai",
    "favicon": "https://www.playerinsight.ai/favicon.ico"
  },

  // AI for Fashion - Size Prediction
  {
    "id": "fashion-sp-021",
    "name": "SizeGenie AI",
    "category": "AI for Fashion",
    "subcategory": "Size Prediction",
    "rating": 4.7,
    "description": "AI-powered size prediction tool that helps customers find their perfect fit and reduces returns.",
    "pricing": "$249-2499/month",
    "tags": ["Size Prediction", "Fit Technology", "Fashion Tech"],
    "url": "https://www.sizegenie.ai",
    "favicon": "https://www.sizegenie.ai/favicon.ico"
  },

  // AI for Fashion - Sustainable Sourcing
  {
    "id": "fashion-ss-021",
    "name": "EcoFashion Pro",
    "category": "AI for Fashion",
    "subcategory": "Sustainable Sourcing",
    "rating": 4.6,
    "description": "AI platform that helps fashion brands source sustainable materials and reduce their environmental impact.",
    "pricing": "$499-4999/month",
    "tags": ["Sustainability", "Ethical Fashion", "Supply Chain"],
    "url": "https://www.ecofashion.pro",
    "favicon": "https://www.ecofashion.pro/favicon.ico"
  },

  // AI for Legal - Legal Research
  {
    "id": "legal-lr-022",
    "name": "LexiSearch AI",
    "category": "AI for Legal",
    "subcategory": "Legal Research",
    "rating": 4.8,
    "description": "Advanced AI-powered legal research platform that helps lawyers find relevant case law and statutes quickly.",
    "pricing": "$299-2999/month",
    "tags": ["Legal Research", "Case Law", "Legal Analytics"],
    "url": "https://www.lexisearch.ai",
    "favicon": "https://www.lexisearch.ai/favicon.ico"
  },

  // AI for Legal - Contract Analysis
  {
    "id": "legal-ca-022",
    "name": "ContractMind AI",
    "category": "AI for Legal",
    "subcategory": "Contract Analysis",
    "rating": 4.7,
    "description": "AI-powered contract analysis tool that identifies key terms, risks, and anomalies in legal documents.",
    "pricing": "$399-3999/month",
    "tags": ["Contract Review", "Legal Tech", "Document Analysis"],
    "url": "https://www.contractmind.ai",
    "favicon": "https://www.contractmind.ai/favicon.ico"
  },

  // AI for E-commerce - Customer Support
  {
    "id": "ecom-cs-022",
    "name": "SupportGenie AI",
    "category": "AI for E-commerce",
    "subcategory": "Customer Support",
    "rating": 4.6,
    "description": "AI-powered customer support solution that provides instant, accurate responses to customer inquiries.",
    "pricing": "$99-999/month",
    "tags": ["Customer Service", "Chatbot", "E-commerce"],
    "url": "https://www.supportgenie.ai",
    "favicon": "https://www.supportgenie.ai/favicon.ico"
  },

  // AI for E-commerce - Inventory Management
  {
    "id": "ecom-im-022",
    "name": "StockWise AI",
    "category": "AI for E-commerce",
    "subcategory": "Inventory Management",
    "rating": 4.7,
    "description": "AI-powered inventory management system that predicts stock levels and automates reordering.",
    "pricing": "$199-1999/month",
    "tags": ["Inventory Optimization", "Supply Chain", "E-commerce"],
    "url": "https://www.stockwise.ai",
    "favicon": "https://www.stockwise.ai/favicon.ico"
  },

  // AI for Media - Content Creation
  {
    "id": "media-cc-022",
    "name": "ContentCraft AI",
    "category": "AI for Media",
    "subcategory": "Content Creation",
    "rating": 4.7,
    "description": "AI-powered content creation platform that generates high-quality, engaging content for various platforms.",
    "pricing": "$29-299/month",
    "tags": ["Content Creation", "Copywriting", "Content Marketing"],
    "url": "https://www.contentcraft.ai",
    "favicon": "https://www.contentcraft.ai/favicon.ico"
  },

  // AI for Media - Video Editing
  {
    "id": "media-ve-022",
    "name": "EditFlow Pro",
    "category": "AI for Media",
    "subcategory": "Video Editing",
    "rating": 4.8,
    "description": "Professional AI-powered video editing platform with advanced automation features.",
    "pricing": "$49-499/month",
    "tags": ["Video Editing", "Content Creation", "Automation"],
    "url": "https://www.editflow.pro",
    "favicon": "https://www.editflow.pro/favicon.ico"
  },

  // AI for Gaming - NPC Behavior
  {
    "id": "gaming-npc-022",
    "name": "AINPC Pro",
    "category": "AI for Gaming",
    "subcategory": "NPC Behavior",
    "rating": 4.7,
    "description": "Advanced AI system for creating realistic, adaptive non-player characters in games.",
    "pricing": "$499-4999/month",
    "tags": ["Game Development", "NPC AI", "Game Design"],
    "url": "https://www.ainpc.pro",
    "favicon": "https://www.ainpc.pro/favicon.ico"
  },

  // AI for Gaming - Game Testing
  {
    "id": "gaming-gt-022",
    "name": "TestBot Elite",
    "category": "AI for Gaming",
    "subcategory": "Game Testing",
    "rating": 4.7,
    "description": "AI-powered game testing platform that identifies bugs and performance issues with precision.",
    "pricing": "$599-5999/month",
    "tags": ["Game Testing", "Quality Assurance", "Automation"],
    "url": "https://www.testbot.elite",
    "favicon": "https://www.testbot.elite/favicon.ico"
  },

  // AI for Fashion - Virtual Try-On
  {
    "id": "fashion-vt-022",
    "name": "StyleFit AI",
    "category": "AI for Fashion",
    "subcategory": "Virtual Try-On",
    "rating": 4.7,
    "description": "Virtual try-on technology that allows customers to see how clothes will look on them before buying.",
    "pricing": "$299-2999/month",
    "tags": ["Virtual Try-On", "Augmented Reality", "Fashion Tech"],
    "url": "https://www.stylefit.ai",
    "favicon": "https://www.stylefit.ai/favicon.ico"
  },

  // AI for Fashion - Trend Prediction
  {
    "id": "fashion-tp-022",
    "name": "TrendSight Pro",
    "category": "AI for Fashion",
    "subcategory": "Trend Prediction",
    "rating": 4.7,
    "description": "AI platform that predicts upcoming fashion trends with high accuracy.",
    "pricing": "$599-5999/month",
    "tags": ["Trend Analysis", "Fashion Forecasting", "Retail Analytics"],
    "url": "https://www.trendsight.pro",
    "favicon": "https://www.trendsight.pro/favicon.ico"
  }
];

export default newTools;
