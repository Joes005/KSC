import re

files = [
    "c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-frontend/src/pages/Home.tsx",
    "c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-frontend/src/pages/About.tsx",
    "c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-frontend/src/pages/Admissions.tsx",
    "c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-frontend/src/pages/University.tsx",
    "c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-frontend/src/pages/Academic.tsx",
]

replacements = {
    # Backgrounds
    r'bg-white\b': 'bg-white/5',
    r'bg-white/40\b': 'bg-white/10',
    r'bg-white/80\b': 'bg-white/10',
    r'bg-white/50\b': 'bg-white/10',
    r'bg-ksc-mist/60\b': 'bg-ksc-navy',
    r'bg-ksc-mist/50\b': 'bg-white/5',
    r'bg-ksc-mist/40\b': 'bg-ksc-navy',
    r'bg-ksc-mist\b': 'bg-white/10',
    r'bg-ksc-deep\b': 'bg-ksc-navy-dark',
    r'bg-\[\#f8f9fa\]': 'bg-ksc-navy-dark',
    r'from-\[\#f8f9fa\]': 'from-ksc-navy-dark',
    r'bg-gray-50\b': 'bg-white/5',
    r'bg-gradient-to-br from-primary to-ksc-dark text-white ring-4 ring-primary/10': 'bg-secondary text-ksc-navy-dark',

    # Text Colors
    r'text-ksc-dark\b': 'text-white',
    r'text-ksc-ink/90\b': 'text-white/80',
    r'text-ksc-ink/85\b': 'text-white/70',
    r'text-ksc-ink/80\b': 'text-white/70',
    r'text-ksc-ink/75\b': 'text-white/60',
    r'text-ksc-ink/70\b': 'text-white/60',
    r'text-ksc-ink\b': 'text-white/80',
    r'text-gray-600\b': 'text-white/60',
    r'text-\[\#000066\]': 'text-white',
    r'text-\[\#1a237e\]': 'text-white/80',
    r'text-primary/70\b': 'text-secondary/70',

    # Borders
    r'border-gray-100\b': 'border-white/10',
    r'border-gray-200\b': 'border-white/10',
    r'border-gray-300\b': 'border-white/20',
    r'border-ksc-green/10\b': 'border-white/5',
    r'border-ksc-green/15\b': 'border-white/10',
    r'border-ksc-green/20\b': 'border-white/10',
    r'border-ksc-mist/80\b': 'border-white/10',
    r'border-\[\#000066\]/10': 'border-white/10',
    
    # Specific tweaks for UI components
    r'hover:bg-gray-50\b': 'hover:bg-white/10',
    r'bg-primary\b': 'bg-ksc-navy-dark', # We have to be careful with bg-primary, maybe it's used for buttons? Actually buttons use btn-gold.
    r'bg-primary/5\b': 'bg-secondary/10',
    r'bg-primary/10\b': 'bg-secondary/10',
    r'bg-gradient-to-r from-primary/10 to-primary/5': 'bg-secondary/10',
    r'text-primary\b': 'text-secondary',
    r'ring-primary/20\b': 'ring-secondary/20',
    r'ring-primary/30\b': 'ring-secondary/30',
    r'hover:border-primary/20\b': 'hover:border-secondary/20',
    r'hover:border-primary/30\b': 'hover:border-secondary/30',
    r'hover:text-primary\b': 'hover:text-secondary',
    r'from-primary\b': 'from-ksc-navy-dark',
    r'to-primary/20\b': 'to-secondary/20',
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Manual fixes for Home.tsx structure wrappers
    if "Home.tsx" in filepath:
        # Wrap sections in proper dark backgrounds
        content = content.replace('className="bg-white/5 py-8 border-b border-white/10', 'className="bg-ksc-navy py-8 border-b border-white/10')
        content = content.replace('className="bg-white/5 py-12 sm:py-16 lg:py-24', 'className="bg-ksc-navy-dark py-12 sm:py-16 lg:py-24')
        content = content.replace('className="bg-ksc-navy py-12 sm:py-16 lg:py-24"', 'className="bg-ksc-navy py-12 sm:py-16 lg:py-24 border-t border-white/5"')
        content = content.replace('className="bg-white/5 py-20"', 'className="bg-ksc-navy py-20 border-t border-white/5"')
        
        # Hero specific
        content = content.replace('className="relative w-full bg-ksc-navy-dark overflow-hidden"', 'className="relative w-full bg-ksc-navy-dark overflow-hidden"')

    if "About.tsx" in filepath:
        content = content.replace('className="bg-white/5 py-16 sm:py-20"', 'className="bg-ksc-navy py-16 sm:py-20"')

    for old, new in replacements.items():
        content = re.sub(old, new, content)

    # Some cleanup for double applications or weird combos
    content = content.replace('bg-white/5/5', 'bg-white/5')
    content = content.replace('text-white/80/80', 'text-white/80')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
