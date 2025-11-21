const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = content.split('\n');

// Find tools in retail-related categories
let retailCategories = new Set();
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
    if (currentTool.category && (currentTool.category.includes('Retail') || currentTool.category.includes('E-commerce') || currentTool.category.includes('Inventory'))) {
      retailCategories.add(currentTool.category);
    }
    currentTool = {};
  }
  
  // Extract category if we're in a tool block
  if (inToolBlock) {
    const categoryMatch = line.match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      currentTool.category = categoryMatch[1];
    }
  }
});

console.log('Retail-related categories:');
Array.from(retailCategories).forEach(category => {
  console.log('-', category);
});

console.log(`\nTotal retail-related categories: ${retailCategories.size}`);