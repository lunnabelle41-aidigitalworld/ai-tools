const fs = require('fs');

// Try to import the data file
try {
  const data = require('./data/ai-updates.ts');
  console.log('Data file loaded successfully');
  console.log('Number of entries:', data.aiUpdates.length);
  console.log('First entry:', JSON.stringify(data.aiUpdates[0], null, 2));
} catch (error) {
  console.error('Error loading data file:', error.message);
  console.error(error.stack);
}