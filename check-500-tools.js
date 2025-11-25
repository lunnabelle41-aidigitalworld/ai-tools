const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('data/ai-tools-database-500.json', 'utf8'));
  console.log('Total AI tools in database:', data.length);
  console.log('First tool:', JSON.stringify(data[0], null, 2));
  console.log('Last tool:', JSON.stringify(data[data.length - 1], null, 2));
} catch (error) {
  console.error('Error reading or parsing JSON file:', error.message);
}