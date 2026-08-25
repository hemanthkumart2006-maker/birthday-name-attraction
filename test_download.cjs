const https = require('https');
const fs = require('fs');

const urls = [
  'https://media.giphy.com/media/12519BfU42YfS/giphy.gif',
  'https://media.giphy.com/media/3o7aD2saal9C7FJUDC/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTlkMHpoMWZ5ejlhdXB6cW9vMmE2Y3l2aXV1YThqNnRjNnVwMzZ3MiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/13Co26UuI9Ial2/giphy.gif'
];

function downloadNext(index) {
  if (index >= urls.length) return;
  const url = urls[index];
  console.log('Trying URL:', url);
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://giphy.com/'
    }
  }, (res) => {
    console.log('  Status Code:', res.statusCode);
    console.log('  Content-Length:', res.headers['content-length']);
    downloadNext(index + 1);
  }).on('error', (err) => {
    console.error('  Error:', err);
    downloadNext(index + 1);
  });
}

downloadNext(0);
