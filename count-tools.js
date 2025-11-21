const fs = require('fs');

// Read the tools file
const content = fs.readFileSync('./data/tools.ts', 'utf8');

// Count the number of tools by counting opening braces that are part of tool objects
const toolMatches = content.match(/export const tools = \[\s*\{/g);
console.log('Tool matches:', toolMatches);

// Count the number of tools by counting closing braces followed by commas or closing brackets
const toolCount = (content.match(/\},/g) || []).length + (content.match(/\}\s*\]/g) || []).length;
console.log('Estimated tool count:', toolCount);

// Let's also try a different approach - count the "id" fields
const idMatches = content.match(/"id":/g);
console.log('Number of "id" fields:', idMatches ? idMatches.length : 0);