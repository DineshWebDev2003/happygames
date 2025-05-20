const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Set production mode
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

// Get port from environment variable or use 3000 as default
const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
}); 