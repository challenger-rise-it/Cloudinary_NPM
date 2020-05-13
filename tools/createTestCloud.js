/**
 * This file when used as a script (node tmp.js) will create a new cloud within Cloudinary
 * The CLOUDINARY_URL environment variable string is created, and stored in ./cloudinary_url.sh
 * To use a fresh cloud in your tests, source ./cloudinary_url.sh before running the tests
 * Example: node tools/createTestCloud && source tools/cloudinary_url.sh && npm run test
 */

const fs = require('fs');
let https = require('https');

let req = https.request({
  method: 'POST',
  hostname: 'sub-account-testing.cloudinary.com',
  path: '/create_sub_account',
  port: 443,
}, (res) => {
  let data = '';
  res.on('data', (d) => {
    data += d;
  });

  res.on('end', () => {
    let cloudData = JSON.parse(data);
    let { payload: { cloudApiKey, cloudApiSecret, cloudName, id } } = cloudData;
    let URL = `CLOUDINARY_URL=cloudinary://${cloudApiKey}:${cloudApiSecret}@${cloudName}`;

    fs.writeFileSync(`tools/cloudinary_url.sh`, URL);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
