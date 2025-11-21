// Debug script to understand URL parameter processing
const fs = require('fs');

// Read a sample of tools to understand the data structure
const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = toolsData.split('\n');

// Extract some sample tools to understand the structure
console.log('=== SAMPLE TOOLS FROM DATA FILE ===');
let sampleCount = 0;
for (let i = 0; i < lines.length && sampleCount < 10; i++) {
  if (lines[i].includes('"category":') && lines[i].includes('"subcategory":')) {
    // Get the full tool object
    let toolLines = [];
    let j = i;
    while (j < lines.length && !lines[j].includes('},')) {
      toolLines.push(lines[j].trim());
      j++;
    }
    if (lines[j].includes('},')) {
      toolLines.push(lines[j].trim());
    }
    
    console.log(`Sample Tool ${sampleCount + 1}:`);
    toolLines.forEach(line => console.log(`  ${line}`));
    console.log('');
    sampleCount++;
    i = j; // Skip to end of this tool
  }
}

// Let's also check what categories and subcategories exist
console.log('=== EXISTING CATEGORIES AND SUBCATEGORIES ===');
const categories = new Set();
const subcategories = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('"category":')) {
    const match = line.match(/"category":\s*"([^"]+)"/);
    if (match) {
      categories.add(match[1]);
    }
  }
  if (line.includes('"subcategory":')) {
    const match = line.match(/"subcategory":\s*"([^"]+)"/);
    if (match) {
      subcategories.add(match[1]);
    }
  }
}

console.log('First 20 categories:');
Array.from(categories).slice(0, 20).forEach((cat, index) => {
  console.log(`  ${index + 1}. ${cat}`);
});

console.log('\nFirst 20 subcategories:');
Array.from(subcategories).slice(0, 20).forEach((sub, index) => {
  console.log(`  ${index + 1}. ${sub}`);
});

// Simulate URL parameter processing for a specific example
console.log('\n=== URL PARAMETER PROCESSING SIMULATION ===');
const testCategory = 'social-media-management';
const testSubcategory = 'instagram-management';

console.log(`Testing URL: /ai-tools/${testCategory}/${testSubcategory}`);

// Simulate the formatName function
const formatName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/&amp;/g, '&')
    .replace(/&/g, '&');
};

const formattedCategory = formatName(testCategory);
const formattedSubcategory = formatName(testSubcategory);

console.log(`Formatted category: "${formattedCategory}"`);
console.log(`Formatted subcategory: "${formattedSubcategory}"`);

// Check if we can find matching tools
console.log('\n=== MATCHING TOOLS SEARCH ===');
let matchCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"category":') && lines[i].includes(`"${formattedCategory}"`)) {
    // Found a potential match, check the subcategory
    for (let j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].includes('"subcategory":') && lines[j].includes(`"${formattedSubcategory}"`)) {
        console.log(`Found matching tool at line ${i}:`);
        // Print the tool
        let k = i;
        while (k < lines.length && !lines[k].includes('},')) {
          console.log(`  ${lines[k].trim()}`);
          k++;
        }
        if (lines[k].includes('},')) {
          console.log(`  ${lines[k].trim()}`);
        }
        matchCount++;
        break;
      }
    }
  }
}

console.log(`\nTotal matching tools found: ${matchCount}`);