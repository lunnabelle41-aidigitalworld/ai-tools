const fs = require('fs');

// Read the tools file
const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');
const lines = toolsData.split('\n');

// Extract all unique categories and subcategories from tools file
const categories = new Set();
const subcategories = new Set();

console.log('Searching for categories and subcategories in tools file...');

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

console.log('\n=== ALL CATEGORIES IN TOOLS FILE ===');
Array.from(categories).sort().forEach((cat, index) => {
  console.log(`${index + 1}. ${cat}`);
});

console.log('\n=== ALL SUBCATEGORIES IN TOOLS FILE ===');
Array.from(subcategories).sort().forEach((sub, index) => {
  console.log(`${index + 1}. ${sub}`);
});

console.log(`\nTotal unique categories: ${categories.size}`);
console.log(`Total unique subcategories: ${subcategories.size}`);

// Check if "Social Media Management" category exists
console.log('\n=== CHECKING FOR SOCIAL MEDIA CATEGORIES ===');
const socialMediaCategories = Array.from(categories).filter(cat => 
  cat.toLowerCase().includes('social') || cat.toLowerCase().includes('media')
);
console.log('Social/media related categories found:', socialMediaCategories);

// Check if "Instagram Management" subcategory exists
console.log('\n=== CHECKING FOR INSTAGRAM SUBCATEGORY ===');
const instagramSubcategories = Array.from(subcategories).filter(sub => 
  sub.toLowerCase().includes('instagram')
);
console.log('Instagram related subcategories found:', instagramSubcategories);