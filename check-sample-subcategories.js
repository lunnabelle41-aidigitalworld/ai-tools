const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = content.split('\n');

// Find subcategories for a few sample categories
const sampleCategories = ['AI for Mental Health & Wellness', 'AI for Education', 'AI for Healthcare'];
const subcategories = {};

let currentTool = {};
let inToolBlock = false;

lines.forEach((line, index) => {
  // Check if we're starting a new tool
  if (line.trim() === '{' && lines[index-1] && lines[index-1].includes('//') === false) {
    inToolBlock = true;
    currentTool = {};
  }
  
  // Check if we're ending a tool
  if (line.trim() === '}' && inToolBlock) {
    inToolBlock = false;
    if (currentTool.category && sampleCategories.includes(currentTool.category)) {
      if (!subcategories[currentTool.category]) {
        subcategories[currentTool.category] = new Set();
      }
      if (currentTool.subcategory) {
        subcategories[currentTool.category].add(currentTool.subcategory);
      }
    }
    currentTool = {};
  }
  
  // Extract properties if we're in a tool block
  if (inToolBlock) {
    const categoryMatch = line.match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      currentTool.category = categoryMatch[1];
    }
    
    const subcategoryMatch = line.match(/"subcategory":\s*"([^"]+)"/);
    if (subcategoryMatch) {
      currentTool.subcategory = subcategoryMatch[1];
    }
  }
});

console.log('Subcategories for sample categories:');
Object.keys(subcategories).forEach(category => {
  console.log(`\n${category}:`);
  Array.from(subcategories[category]).forEach(subcategory => {
    console.log(`  - ${subcategory}`);
  });
});