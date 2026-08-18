import re

with open('src/data/universities.ts', 'r') as f:
    content = f.read()

# Replace all external URLs with '#'
content = re.sub(r'website:\s*"[^"]+"', 'website: "#"', content)
content = re.sub(r'hallTicketUrl:\s*"[^"]+"', 'hallTicketUrl: "#"', content)
content = re.sub(r'timetableUrl:\s*"[^"]+"', 'timetableUrl: "#"', content)
content = re.sub(r'syllabusUrl:\s*"[^"]+"', 'syllabusUrl: "#"', content)

# Split content into before array, inside array, after array
before, rest = content.split("export const UNIVERSITIES: University[] = [", 1)
array_content, after = rest.split("];\n\nexport const getUniversityBySlug", 1)

# Inside array_content, there are four objects.
# We can find their start index
id_tnou = array_content.find('id: "tnou",')
id_bdu = array_content.find('id: "bdu",')
id_alu = array_content.find('id: "alagappa",')
id_msu = array_content.find('id: "msu",')

# TNOU is from start to BDU header
# Let's find the exact boundaries by looking at the comment blocks
tnou_header = array_content.find('  {\n    id: "tnou",')
bdu_header = array_content.find('  /* =========================================================================== */\n  /* BHARATHIDASAN UNIVERSITY (BDU)')
alu_header = array_content.find('  /* =========================================================================== */\n  /* ALAGAPPA UNIVERSITY (ALU)')
msu_header = array_content.find('  /* =========================================================================== */\n  /* MANONMANIAM SUNDARANAR UNIVERSITY (MSU)')

tnou_str = array_content[tnou_header:bdu_header]
bdu_str = array_content[bdu_header:alu_header]
alu_str = array_content[alu_header:msu_header]
msu_str = array_content[msu_header:]

new_array_content = "\n" + alu_str + bdu_str + msu_str + "  /* =========================================================================== */\n  /* TAMIL NADU OPEN UNIVERSITY (TNOU)                                           */\n  /* =========================================================================== */\n\n" + tnou_str

new_content = before + "export const UNIVERSITIES: University[] = [" + new_array_content + "];\n\nexport const getUniversityBySlug" + after

with open('src/data/universities.ts', 'w') as f:
    f.write(new_content)

print("Done")
