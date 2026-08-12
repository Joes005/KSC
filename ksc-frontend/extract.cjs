const fs = require('fs');
const buffer = fs.readFileSync('C:\\Users\\Hello\\Downloads\\ksc logo.pdf');

// Search for JPG
let jpgStart = Buffer.from([0xFF, 0xD8, 0xFF]);
let jpgEnd = Buffer.from([0xFF, 0xD9]);
let startIdx = buffer.indexOf(jpgStart);
if (startIdx !== -1) {
  let endIdx = buffer.indexOf(jpgEnd, startIdx);
  if (endIdx !== -1) {
    fs.writeFileSync('public/logo.jpg', buffer.subarray(startIdx, endIdx + 2));
    console.log('Extracted JPG');
    process.exit(0);
  }
}

// Search for PNG
let pngStart = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
let pngEnd = Buffer.from([0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
startIdx = buffer.indexOf(pngStart);
if (startIdx !== -1) {
  let endIdx = buffer.indexOf(pngEnd, startIdx);
  if (endIdx !== -1) {
    fs.writeFileSync('public/logo.png', buffer.subarray(startIdx, endIdx + 8));
    console.log('Extracted PNG');
    process.exit(0);
  }
}

console.log('No image found');
