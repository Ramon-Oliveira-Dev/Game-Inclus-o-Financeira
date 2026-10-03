const fs = require('fs');
const content = fs.readFileSync('src/dataTranslations.ts', 'utf8');
console.log("Length:", content.length);
