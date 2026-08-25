const https = require('https');
const fs = require('fs');

const url = 'https://media.giphy.com/media/13Co26UuI9Ial2/giphy.gif';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://giphy.com/'
  }
};

https.get(url, options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let chunks = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });
  
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    console.log('Downloaded Length:', buffer.length);
    fs.writeFileSync('test_bear.gif', buffer);
    console.log('First 50 bytes:', buffer.slice(0, 50).toString('hex'));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});
