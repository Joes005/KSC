const fs = require('fs');
const path = 'c:/Users/Hello/Documents/Levin/New folder/KSC/ksc-backend/database/seeders/DatabaseSeeder.php';
let content = fs.readFileSync(path, 'utf8');

// Fix strings
content = content.replace(
  "                        'Authorised study centre of Tamil Nadu Open University (TNOU)',\n                        'Recognised centre of Bharathidasan University (BDU)',\n                        'Partner study centre of Alagappa University (ALU)',\n                        'Affiliated with UGC-DEB recognised distance education',",
  "                        'Partner study centre of Alagappa University',\n                        'Recognised centre of Bharathiar University',\n                        'Authorised study centre of Manonmaniam Sundaranar University',\n                        'Authorised study centre of Tamilnadu Open University',\n                        'Affiliated with UGC-DEB recognised distance education',"
);

content = content.replace(
  "                        'Recognised study-centre partnership with Tamil Nadu Open University',\n                        'Admission-support relationship with Bharathidasan University',\n                        'Admission-support relationship with Alagappa University (CDOE)',\n                        'UGC-DEB recognised distance-education programmes (as applicable per university)',",
  "                        'Admission-support relationship with Alagappa University',\n                        'Admission-support relationship with Bharathiar University',\n                        'Admission-support relationship with Manonmaniam Sundaranar University',\n                        'Recognised study-centre partnership with Tamilnadu Open University',\n                        'UGC-DEB recognised distance-education programmes (as applicable per university)',"
);

// Reorder array
const getBlock = (startPattern, nextPattern, str) => {
  const start = str.indexOf(startPattern);
  if (start === -1) return '';
  const end = nextPattern ? str.indexOf(nextPattern, start) : str.indexOf('        ];', start);
  return str.substring(start, end);
};

const tnouBlock = getBlock("            [\n                'slug' => 'tnou',", "            [\n                'slug' => 'bdu',", content);
const bduBlock = getBlock("            [\n                'slug' => 'bdu',", "            [\n                'slug' => 'alagappa',", content);
const alagappaBlock = getBlock("            [\n                'slug' => 'alagappa',", "            [\n                'slug' => 'msu',", content);
const msuBlock = getBlock("            [\n                'slug' => 'msu',", null, content);

if (tnouBlock && bduBlock && alagappaBlock && msuBlock) {
  const oldArray = tnouBlock + bduBlock + alagappaBlock + msuBlock;
  const newArray = alagappaBlock + bduBlock + msuBlock + tnouBlock;
  content = content.replace(oldArray, newArray);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully reordered and updated strings.');
} else {
  console.log('Could not find all blocks:', { tnou: !!tnouBlock, bdu: !!bduBlock, alagappa: !!alagappaBlock, msu: !!msuBlock });
}
