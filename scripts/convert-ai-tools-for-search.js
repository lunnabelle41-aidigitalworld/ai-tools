const fs = require('fs');

// Read the expanded AI tools database
const aiToolsData = JSON.parse(fs.readFileSync('./data/ai-tools-database-1000.json', 'utf8'));

// Convert to the format used by the search service
const convertedTools = aiToolsData.map((tool, index) => {
  return {
    id: `tool-${index + 1}`,
    name: tool.name,
    category: tool.category[0] || 'General',
    subcategory: 'AI Tool',
    rating: Math.floor(Math.random() * 50) / 10, // Random rating between 0 and 5
    description: tool.description,
    pricing: tool.pricing,
    features: tool.features,
    url: tool.website,
    favicon: `https://www.google.com/s2/favicons?domain=${new URL(tool.website).hostname}`,
    tags: tool.features.slice(0, 5), // Use first 5 features as tags
    launch_date: tool.launch_date,
    last_updated: tool.last_updated,
    reviews: Math.floor(Math.random() * 500) // Random number of reviews
  };
});

// Save the converted tools
fs.writeFileSync('./data/converted-ai-tools.json', JSON.stringify(convertedTools, null, 2));
console.log(`Successfully converted ${convertedTools.length} AI tools for search service`);