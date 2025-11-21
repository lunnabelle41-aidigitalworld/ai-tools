const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');

// Split by tool objects
const toolObjects = content.split(/\n\s*\{\s*\n/).slice(1); // Skip the first part which is the export line

// Look for tools in the "AI & Generative Art" category
let foundTools = [];

console.log('Searching for tools in "AI & Generative Art" category...\n');

toolObjects.forEach((toolStr, index) => {
  if (toolStr.includes('AI & Generative Art')) {
    // Extract the category
    const categoryMatch = toolStr.match(/"category":\s*"([^"]+)"/);
    const category = categoryMatch ? categoryMatch[1] : 'Unknown';
    
    // Extract the name
    const nameMatch = toolStr.match(/"name":\s*"([^"]+)"/);
    const name = nameMatch ? nameMatch[1] : 'Unknown';
    
    // Extract the subcategory
    const subcategoryMatch = toolStr.match(/"subcategory":\s*"([^"]+)"/);
    const subcategory = subcategoryMatch ? subcategoryMatch[1] : 'Unknown';
    
    // Extract the description
    const descriptionMatch = toolStr.match(/"description":\s*"([^"]+)"/);
    const description = descriptionMatch ? descriptionMatch[1] : 'No description';
    
    foundTools.push({
      name: name,
      category: category,
      subcategory: subcategory,
      description: description
    });
  }
});

console.log(`Found ${foundTools.length} tools in "AI & Generative Art" category:`);
foundTools.forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.name}`);
  console.log(`   Category: ${tool.category}`);
  console.log(`   Subcategory: ${tool.subcategory}`);
  console.log(`   Description: ${tool.description}`);
  console.log('');
});

// Also check what categories contain "Art"
console.log('\nSearching for categories containing "Art"...');
let artCategories = new Set();

toolObjects.forEach((toolStr, index) => {
  const categoryMatch = toolStr.match(/"category":\s*"([^"]+)"/);
  if (categoryMatch && categoryMatch[1].includes('Art')) {
    artCategories.add(categoryMatch[1]);
  }
});

console.log('\nCategories containing "Art":');
Array.from(artCategories).forEach(category => {
  console.log('-', category);
});