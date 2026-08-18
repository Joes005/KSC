import fs from 'fs';
const files = {
  'src/pages/About.tsx': '/assets/images/about-students.png',
  'src/pages/University.tsx': '/assets/gallery/tnou-ay2026.jpg',
  'src/pages/Academic.tsx': '/assets/gallery/ksc-09.jpg',
  'src/pages/Gallery.tsx': '/assets/gallery/ksc-01.jpg',
  'src/pages/Facilities.tsx': '/assets/gallery/ksc-11.jpg',
  'src/pages/Curriculum.tsx': '/assets/gallery/ksc-10.jpg',
  'src/pages/Founder.tsx': '/assets/gallery/ksc-05.jpg',
  'src/pages/Chairman.tsx': '/assets/gallery/ksc-06.jpg'
};
for (const [file, img] of Object.entries(files)) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<PageHeader/g, `<PageHeader bgImage="${img}"`);
    fs.writeFileSync(file, content);
  } catch(e) {
    console.error(`Failed to process ${file}`, e);
  }
}
console.log('Done');
