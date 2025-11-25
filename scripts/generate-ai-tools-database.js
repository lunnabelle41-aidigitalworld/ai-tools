const fs = require('fs');

// Required Categories & Examples
const aiCategories = {
  text_generation: ['ChatGPT', 'Claude', 'Jasper', 'Copy.ai', 'Writer'],
  image_generation: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Leonardo AI'],
  video_ai: ['Runway', 'Pika Labs', 'HeyGen', 'Synthesia'],
  audio_ai: ['Murf AI', 'ElevenLabs', 'Adobe Podcast'],
  code_ai: ['GitHub Copilot', 'Replit Ghostwriter', 'Tabnine', 'Codeium'],
  productivity: ['Notion AI', 'Grammarly', 'QuillBot', 'Otter.ai'],
  research: ['Consensus', 'Elicit', 'Scite', 'ChatPDF'],
  business: ['Jasper Business', 'Copy.ai Enterprise', 'Writer for Teams']
};

// Feature options for generating tools
const featuresOptions = [
  "AI-powered", "cloud-based", "real-time processing", "API access", 
  "mobile app", "chrome extension", "multi-language support", "collaboration tools",
  "analytics dashboard", "customizable", "integrations", "automation",
  "security features", "scalable", "user-friendly", "enterprise-grade"
];

// Pricing plan options
const pricingPlans = ["Basic", "Pro", "Enterprise", "Team", "Starter", "Premium"];

// Generate additional tools to reach 500+ AI tools
const generateAdditionalTools = () => {
  const additionalTools = [];
  const prefixes = [
    "AI", "Smart", "NextGen", "Pro", "Ultra", "Advanced", "Enterprise", "Premium",
    "Intelli", "Neuro", "Cogni", "Deep", "Quantum", "Nexus", "Synergy", "Omni"
  ];
  const suffixes = [
    "Assistant", "Platform", "Studio", "Lab", "Engine", "Suite", "Hub", "Center",
    "Master", "Genius", "Bot", "Mind", "Brain", "Logic", "Sense", "Vision"
  ];
  const categories = Object.keys(aiCategories);
  
  // Generate 500 tools
  for (let i = 0; i < 500; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Generate random features (3-6 features)
    const numFeatures = Math.floor(Math.random() * 4) + 3;
    const features = [];
    for (let j = 0; j < numFeatures; j++) {
      const feature = featuresOptions[Math.floor(Math.random() * featuresOptions.length)];
      if (!features.includes(feature)) {
        features.push(feature);
      }
    }
    
    // Generate random pricing plans (1-3 plans)
    const numPlans = Math.floor(Math.random() * 3) + 1;
    const plans = [];
    for (let j = 0; j < numPlans; j++) {
      const plan = pricingPlans[Math.floor(Math.random() * pricingPlans.length)];
      if (!plans.includes(plan)) {
        plans.push(plan);
      }
    }
    
    // Randomly decide if free/paid
    const hasFree = Math.random() > 0.3;
    const hasPaid = Math.random() > 0.2;
    
    const tool = {
      name: `${prefix} ${suffix} ${i + 1}`,
      category: [category],
      description: `Advanced ${category.replace('_', ' ')} tool with cutting-edge AI capabilities for professionals and businesses`,
      pricing: { 
        free: hasFree, 
        paid: hasPaid, 
        plans: hasPaid ? plans : []
      },
      features: features,
      website: `https://${prefix.toLowerCase()}${suffix.toLowerCase()}${i + 1}.com`,
      launch_date: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      last_updated: new Date().toISOString().split('T')[0]
    };
    
    additionalTools.push(tool);
  }
  
  return additionalTools;
};

// Generate all tools
const allTools = generateAdditionalTools();

// Write to a JSON file
const outputPath = './data/ai-tools-database-500.json';
fs.writeFileSync(outputPath, JSON.stringify(allTools, null, 2));
console.log(`Successfully generated ${allTools.length} AI tools and saved to: ${outputPath}`);