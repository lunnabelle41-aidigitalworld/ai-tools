const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');

// Split by tool objects
const toolObjects = content.split(/\n\s*\{\s*\n/).slice(1); // Skip the first part which is the export line

let retailSubcategories = new Set();

console.log('Finding subcategories in "AI for Retail" category...');

toolObjects.forEach((toolStr, index) => {
  if (toolStr.includes('"category": "AI for Retail"')) {
    const subcategoryMatch = toolStr.match(/"subcategory":\s*"([^"]+)"/);
    if (subcategoryMatch) {
      retailSubcategories.add(subcategoryMatch[1]);
    }
  }
});

console.log('\nSubcategories in "AI for Retail" category:');
let count = 1;
Array.from(retailSubcategories).forEach(subcategory => {
  console.log(`${count}. ${subcategory}`);
  count++;
});

console.log(`\nTotal subcategories: ${retailSubcategories.size}`);