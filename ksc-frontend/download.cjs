const https = require('https');
const fs = require('fs');

const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/en/2/23/Tamil_Nadu_Open_University_Logo.png', file: 'public/assets/images/tnou-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Bharathidasan_University_logo.png', file: 'public/assets/images/bdu-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Alagappa_University_logo.png', file: 'public/assets/images/alu-logo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Manonmaniam_Sundaranar_University_logo.png', file: 'public/assets/images/msu-logo.png' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
         return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  for (const item of urls) {
    try {
      await download(item.url, item.file);
      console.log(`Downloaded ${item.file}`);
    } catch (e) {
      console.error(e);
    }
  }
}

main();
