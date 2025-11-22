const fs = require('fs');

// Read the tools file
let toolsContent = fs.readFileSync('./data/tools.ts', 'utf8');

// Define new tools to add to empty subcategories
const newTools = [
  // AI for Healthcare - Telemedicine
  {
    id: "healthcare-005",
    name: "Teladoc",
    category: "AI for Healthcare",
    subcategory: "Telemedicine",
    rating: 4.5,
    description: "AI-powered telemedicine platform that connects patients with healthcare providers for remote consultations.",
    pricing: "$40-99/month",
    tags: ["Telemedicine", "Remote Consultations", "Virtual Healthcare", "Medical Access"],
    url: "https://www.teladoc.com",
    favicon: "https://www.teladoc.com/favicon.ico"
  },
  
  // AI for Healthcare - Mental Health
  {
    id: "healthcare-006",
    name: "Woebot",
    category: "AI for Healthcare",
    subcategory: "Mental Health",
    rating: 4.4,
    description: "AI-powered mental health chatbot that provides cognitive behavioral therapy and emotional support.",
    pricing: "Free, $39/month for premium features",
    tags: ["Mental Health", "CBT Therapy", "Emotional Support", "Chatbot Therapy"],
    url: "https://woebothealth.com",
    favicon: "https://woebothealth.com/favicon.ico"
  },

  // AI for Education - Special Education
  {
    id: "education-003",
    name: "Lingokids",
    category: "AI for Education",
    subcategory: "Special Education",
    rating: 4.6,
    description: "AI-driven special education platform that helps children with learning differences through personalized activities.",
    pricing: "$6.99-14.99/month",
    tags: ["Special Education", "Learning Differences", "Personalized Learning", "Child Development"],
    url: "https://www.lingokids.com",
    favicon: "https://www.lingokids.com/favicon.ico"
  },

  // AI for Education - Online Learning
  {
    id: "education-004",
    name: "Coursera",
    category: "AI for Education",
    subcategory: "Online Learning",
    rating: 4.5,
    description: "AI-powered online learning platform that offers courses from top universities and companies worldwide.",
    pricing: "Free courses available, $39-79/month for premium features",
    tags: ["Online Learning", "MOOC", "Course Platform", "Educational Content"],
    url: "https://www.coursera.org",
    favicon: "https://www.coursera.org/favicon.ico"
  }
];

// Convert tools to the format in tools.ts
const toolsToAdd = newTools.map(tool => {
  return `  {
    id: "${tool.id}",
    name: "${tool.name}",
    category: "${tool.category}",
    subcategory: "${tool.subcategory}",
    rating: ${tool.rating},
    description: "${tool.description}",
    pricing: "${tool.pricing}",
    tags: [${tool.tags.map(tag => `"${tag}"`).join(', ')}],
    url: "${tool.url}",
    favicon: "${tool.favicon}"
  }`;
}).join(',\n');

// Insert the new tools before the closing bracket of the tools array
const insertIndex = toolsContent.lastIndexOf('];');
if (insertIndex === -1) {
  console.error('Could not find the closing bracket of the tools array');
  process.exit(1);
}

// Add a comma after the last tool if there isn't one
let modifiedContent = toolsContent.slice(0, insertIndex);
if (!modifiedContent.endsWith(',')) {
  modifiedContent += ',';
}
modifiedContent += '\n' + toolsToAdd + '\n];';

// Write the updated content back to the file
fs.writeFileSync('./data/tools.ts', modifiedContent);

console.log(`Added ${newTools.length} new tools to tools.ts`);