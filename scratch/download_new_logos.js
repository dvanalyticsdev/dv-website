import https from 'https';
import fs from 'fs';
import path from 'path';

const publicDir = "c:\\Users\\pushk\\OneDrive\\Documents\\Projects\\dv-website\\public\\companies";

const logosToDownload = [
  { name: 'paypal.png', urls: ['https://logo.clearbit.com/paypal.com', 'https://www.google.com/s2/favicons?domain=paypal.com&sz=128'] },
  { name: 'anz.png', urls: ['https://logo.clearbit.com/anz.com', 'https://www.google.com/s2/favicons?domain=anz.com&sz=128'] },
  { name: 'hdfcergo.png', urls: ['https://logo.clearbit.com/hdfcergo.com', 'https://www.google.com/s2/favicons?domain=hdfcergo.com&sz=128'] },
  { name: 'ey.png', urls: ['https://logo.clearbit.com/ey.com', 'https://www.google.com/s2/favicons?domain=ey.com&sz=128'] }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
      } else {
        reject(new Error(`Status Code: ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const item of logosToDownload) {
    const destPath = path.join(publicDir, item.name);
    console.log(`Downloading ${item.name}...`);
    let success = false;
    for (const url of item.urls) {
      try {
        await downloadFile(url, destPath);
        console.log(`Successfully downloaded ${item.name} from ${url}`);
        success = true;
        break;
      } catch (e) {
        console.log(`Failed url ${url}: ${e.message}`);
      }
    }
    if (!success) {
      console.error(`Could not download any logo for ${item.name}`);
    }
  }
}

run();
