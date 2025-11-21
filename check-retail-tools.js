const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = content.split('\n');

// Find tools in the "AI for Retail" category
let toolCount = 0;
let currentTool = {};
let inToolBlock = false;

console.log('Tools in "AI for Retail" category:');

lines.forEach((line, index) => {
  // Check if we're starting a new tool
  if (line.trim() === '{' && lines[index-1] && lines[index-1].includes('//') === false) {
    inToolBlock = true;
    currentTool = {};
  }
  
  // Check if we're ending a tool
  if (line.trim() === '}' && inToolBlock) {
    inToolBlock = false;
    if (currentTool.category === 'AI for Retail') {
      toolCount++;
      console.log(`${toolCount}. ${currentTool.name} - ${currentTool.subcategory}`);
      console.log(`   ${currentTool.description}`);
      console.log(`   Rating: ${currentTool.rating}`);
      console.log('');
    }
    currentTool = {};
  }
  
  // Extract properties if we're in a tool block
  if (inToolBlock) {
    const categoryMatch = line.match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      currentTool.category = categoryMatch[1];
    }
    
    const nameMatch = line.match(/"name":\s*"([^"]+)"/);
    if (nameMatch) {
      currentTool.name = nameMatch[1];
    }
    
    const subcategoryMatch = line.match(/"subcategory":\s*"([^"]+)"/);
    if (subcategoryMatch) {
      currentTool.subcategory = subcategoryMatch[1];
    }
    
    const descriptionMatch = line.match(/"description":\s*"([^"]+)"/);
    if (descriptionMatch) {
      currentTool.description = descriptionMatch[1];
    }
    
    const ratingMatch = line.match(/"rating":\s*([0-9.]+)/);
    if (ratingMatch) {
      currentTool.rating = parseFloat(ratingMatch[1]);
    }
  }
});

console.log(`Total tools in "AI for Retail" category: ${toolCount}`);