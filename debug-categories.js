const fs = require('fs');

// Read the tools file
const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');

// Extract all unique categories and subcategories
const categories = new Set();
const subcategories = new Set();

// Split the file into lines and process
const lines = toolsData.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"category":')) {
    const categoryMatch = line.match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      categories.add(categoryMatch[1]);
    }
  }
  if (line.includes('"subcategory":')) {
    const subcategoryMatch = line.match(/"subcategory":\s*"([^"]+)"/);
    if (subcategoryMatch) {
      subcategories.add(subcategoryMatch[1]);
    }
  }
}

console.log('Unique categories found:');
console.log(Array.from(categories).sort());

console.log('\nUnique subcategories found:');
console.log(Array.from(subcategories).sort());

// Look for tools with "Image Generation" category specifically
console.log('\nSearching for tools with "Image Generation" category...');
let imageGenCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"category": "Image Generation"')) {
    imageGenCount++;
  }
}
console.log(`Found ${imageGenCount} tools with "Image Generation" category`);

// Look for tools with "AI & Generative Art" subcategory
console.log('\nSearching for tools with "AI & Generative Art" subcategory...');
let generativeArtCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"subcategory": "AI & Generative Art"')) {
    generativeArtCount++;
  }
}
console.log(`Found ${generativeArtCount} tools with "AI & Generative Art" subcategory`);