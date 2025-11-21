const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = content.split('\n');

// Find all unique categories
const categories = new Set();

lines.forEach(line => {
  if (line.includes('"category":')) {
    const match = line.match(/"category":\s*"([^"]+)"/);
    if (match) {
      categories.add(match[1]);
    }
  }
});

console.log('Unique categories in tools database:');
Array.from(categories).forEach(category => {
  console.log('-', category);
});

console.log('\nTotal unique categories:', categories.size);