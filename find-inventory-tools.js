const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');

// Split by tool objects
const toolObjects = content.split(/\n\s*\{\s*\n/).slice(1); // Skip the first part which is the export line

let inventoryTools = [];

console.log('Searching for inventory management tools...');

toolObjects.forEach((toolStr, index) => {
  // Check if this tool is in the "AI for Retail" category and has inventory-related subcategory
  if ((toolStr.includes('"category": "AI for Retail"') && 
       (toolStr.includes('Inventory') || toolStr.includes('inventory') || toolStr.includes('Stock') || toolStr.includes('stock'))) ||
      (toolStr.includes('Inventory') && toolStr.includes('Management'))) {
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
    
    // Extract the rating
    const ratingMatch = toolStr.match(/"rating":\s*([0-9.]+)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    
    inventoryTools.push({
      name: name,
      category: category,
      subcategory: subcategory,
      description: description,
      rating: rating
    });
  }
});

console.log(`\nTotal inventory-related tools found: ${inventoryTools.length}`);

if (inventoryTools.length > 0) {
  console.log('\nInventory management tools:');
  inventoryTools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
    console.log(`   Category: ${tool.category}`);
    console.log(`   Subcategory: ${tool.subcategory}`);
    console.log(`   Rating: ${tool.rating}`);
    console.log(`   Description: ${tool.description}`);
    console.log('');
  });
} else {
  console.log('\nNo specific inventory management tools found.');
  
  // Let's check what subcategories exist in the "AI for Retail" category
  let retailSubcategories = new Set();
  
  toolObjects.forEach((toolStr, index) => {
    if (toolStr.includes('"category": "AI for Retail"')) {
      const subcategoryMatch = toolStr.match(/"subcategory":\s*"([^"]+)"/);
      if (subcategoryMatch) {
        retailSubcategories.add(subcategoryMatch[1]);
      }
    }
  });
  
  console.log('\nSubcategories in "AI for Retail" category:');
  Array.from(retailSubcategories).forEach(subcategory => {
    console.log('-', subcategory);
  });
}