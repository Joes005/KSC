const fs = require('fs');
const path = require('path');

const files = [
    "src/pages/Home.tsx",
    "src/pages/About.tsx",
    "src/pages/Admissions.tsx",
    "src/pages/University.tsx",
    "src/pages/Academic.tsx",
];

const replacements = [
    [/bg-white\b/g, 'bg-white/5'],
    [/bg-white\/40\b/g, 'bg-white/10'],
    [/bg-white\/80\b/g, 'bg-white/10'],
    [/bg-white\/50\b/g, 'bg-white/10'],
    [/bg-ksc-mist\/60\b/g, 'bg-ksc-navy'],
    [/bg-ksc-mist\/50\b/g, 'bg-white/5'],
    [/bg-ksc-mist\/40\b/g, 'bg-ksc-navy'],
    [/bg-ksc-mist\b/g, 'bg-white/10'],
    [/bg-ksc-deep\b/g, 'bg-ksc-navy-dark'],
    [/bg-\[\#f8f9fa\]/g, 'bg-ksc-navy-dark'],
    [/from-\[\#f8f9fa\]/g, 'from-ksc-navy-dark'],
    [/bg-gray-50\b/g, 'bg-white/5'],
    [/bg-gradient-to-br from-primary to-ksc-dark text-white ring-4 ring-primary\/10/g, 'bg-secondary text-ksc-navy-dark'],
    [/text-ksc-dark\b/g, 'text-white'],
    [/text-ksc-ink\/90\b/g, 'text-white/80'],
    [/text-ksc-ink\/85\b/g, 'text-white/70'],
    [/text-ksc-ink\/80\b/g, 'text-white/70'],
    [/text-ksc-ink\/75\b/g, 'text-white/60'],
    [/text-ksc-ink\/70\b/g, 'text-white/60'],
    [/text-ksc-ink\b/g, 'text-white/80'],
    [/text-gray-600\b/g, 'text-white/60'],
    [/text-\[\#000066\]/g, 'text-white'],
    [/text-\[\#1a237e\]/g, 'text-white/80'],
    [/text-primary\/70\b/g, 'text-secondary/70'],
    [/border-gray-100\b/g, 'border-white/10'],
    [/border-gray-200\b/g, 'border-white/10'],
    [/border-gray-300\b/g, 'border-white/20'],
    [/border-ksc-green\/10\b/g, 'border-white/5'],
    [/border-ksc-green\/15\b/g, 'border-white/10'],
    [/border-ksc-green\/20\b/g, 'border-white/10'],
    [/border-ksc-mist\/80\b/g, 'border-white/10'],
    [/border-\[\#000066\]\/10/g, 'border-white/10'],
    [/hover:bg-gray-50\b/g, 'hover:bg-white/10'],
    [/bg-primary\b/g, 'bg-ksc-navy-dark'],
    [/bg-primary\/5\b/g, 'bg-secondary/10'],
    [/bg-primary\/10\b/g, 'bg-secondary/10'],
    [/bg-gradient-to-r from-primary\/10 to-primary\/5/g, 'bg-secondary/10'],
    [/text-primary\b/g, 'text-secondary'],
    [/ring-primary\/20\b/g, 'ring-secondary/20'],
    [/ring-primary\/30\b/g, 'ring-secondary/30'],
    [/hover:border-primary\/20\b/g, 'hover:border-secondary/20'],
    [/hover:border-primary\/30\b/g, 'hover:border-secondary/30'],
    [/hover:text-primary\b/g, 'hover:text-secondary'],
    [/from-primary\b/g, 'from-ksc-navy-dark'],
    [/to-primary\/20\b/g, 'to-secondary/20'],
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
        console.error("Not found:", filePath);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');

    replacements.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
    });

    if (file.includes("Home.tsx")) {
        content = content.replace('className="bg-white/5 py-8 border-b border-white/10', 'className="bg-ksc-navy py-8 border-b border-white/10');
        content = content.replace('className="bg-white/5 py-12 sm:py-16 lg:py-24', 'className="bg-ksc-navy-dark py-12 sm:py-16 lg:py-24');
        content = content.replace('className="bg-ksc-navy py-12 sm:py-16 lg:py-24"', 'className="bg-ksc-navy py-12 sm:py-16 lg:py-24 border-t border-white/5"');
        content = content.replace('className="bg-white/5 py-20"', 'className="bg-ksc-navy py-20 border-t border-white/5"');
    }
    if (file.includes("About.tsx")) {
        content = content.replace('className="bg-white/5 py-16 sm:py-20"', 'className="bg-ksc-navy py-16 sm:py-20"');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Processed:", file);
});
