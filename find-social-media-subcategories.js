const fs = require('fs');

// Read the tools file
const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = toolsData.split('\n');

console.log('=== SUBCATEGORIES IN SOCIAL MEDIA MANAGEMENT CATEGORY ===');

const subcategories = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Check if we're in a Social Media Management tool
  if (line.includes('"category": "Social Media Management"')) {
    // Look for the subcategory in the next few lines
    for (let j = i; j < Math.min(i + 10, lines.length); j++) {
      const subLine = lines[j].trim();
      if (subLine.includes('"subcategory":')) {
        const match = subLine.match(/"subcategory":\s*"([^"]+)"/);
        if (match) {
          subcategories.add(match[1]);
        }
        break;
      }
    }
  }
}

console.log('Subcategories found:');
Array.from(subcategories).sort().forEach((sub, index) => {
  console.log(`${index + 1}. ${sub}`);
});