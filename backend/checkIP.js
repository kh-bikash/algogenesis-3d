const https = require('https');

https.get('https://api.ipify.org?format=json', (res) => {
  let data = '';

  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Your public IP is:', JSON.parse(data).ip);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
