// server.js

// require needed packages
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const nextConfig = require('./next.config'); // next.config.js

const port = parseInt(process.env.PORT, 10) || 3003; // default to port 3003 if not specified
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname, conf: nextConfig }); // Create a new next instance
const handle = app.getRequestHandler();

// start up the server on the specified port and route traffic to the pages directory
app.prepare().then(() => {
  createServer((req, res) =>
    handle(req, res, parse(req.url, true).pathname),
  ).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
