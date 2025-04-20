const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const host = '0.0.0.0';

console.log('Starting server with configuration:');
console.log(`- Environment: ${process.env.NODE_ENV}`);
console.log(`- Host: ${host}`);
console.log(`- Port: ${port}`);
console.log(`- NextAuth URL: ${process.env.NEXTAUTH_URL}`);

const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.pem'))
};

app.prepare().then(() => {
  console.log('Next.js app prepared');
  
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      console.log(`Handling request: ${req.method} ${req.url}`);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, host, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${host}:${port}`);
  });
}); 