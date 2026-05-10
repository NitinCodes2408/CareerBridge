const fs=require('fs');
const http=require('https');
const html=fs.readFileSync('learning.html', 'utf8');
const regex = /<img src=\"(https:\/\/images\.unsplash\.com[^\"]+)\"/g;
const urls = [];
let m;
while ((m = regex.exec(html)) !== null) {
  urls.push(m[1]);
}
Promise.all(urls.map(u => new Promise(r => {
  http.get(u, res => r({u, status: res.statusCode})).on('error', ()=>r({u, status: 0}));
}))).then(results => {
  results.filter(r => r.status >= 400).forEach(r => console.log(r.u));
});
