const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');

// Split by tool objects
const toolObjects = content.split(/\n\s*\{\s*\n/).slice(1); // Skip the first part which is the export line

let retailTools = [];
let retailCategories = new Set();

console.log('Searching for retail-related tools...');

toolObjects.forEach((toolStr, index) => {
  // Check if this tool is in a retail-related category
  if (toolStr.includes('Retail') || toolStr.includes('E-commerce') || toolStr.includes('Inventory') || toolStr.includes('Commerce')) {
    // Extract the category
    const categoryMatch = toolStr.match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      const category = categoryMatch[1];
      retailCategories.add(category);
      
      // Extract the name
      const nameMatch = toolStr.match(/"name":\s*"([^"]+)"/);
      const name = nameMatch ? nameMatch[1] : 'Unknown';
      
      // Extract the subcategory
      const subcategoryMatch = toolStr.match(/"subcategory":\s*"([^"]+)"/);
      const subcategory = subcategoryMatch ? subcategoryMatch[1] : 'Unknown';
      
      retailTools.push({
        name: name,
        category: category,
        subcategory: subcategory
      });
    }
  }
});

console.log('\nRetail-related categories found:');
Array.from(retailCategories).forEach(category => {
  console.log('-', category);
});

console.log(`\nTotal retail-related tools found: ${retailTools.length}`);

if (retailTools.length > 0) {
  console.log('\nSample retail tools:');
  retailTools.slice(0, 10).forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name} (${tool.category} - ${tool.subcategory})`);
  });
}