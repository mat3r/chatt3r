// external dependencies
const path    = require('path');
const express = require('express');
const http    = require('http');
require('dotenv').config();

// local dependencies
const servConf    = require('./src/config/server');
const mountRoutes = require('./src/routes');
const sockets     = require('./src/sockets');

// Instantiate app and socketio
const app    = express();
const server = http.createServer(app);
sockets.socketServer(app, server);

app.use(express.static(path.join(__dirname, 'public')));

mountRoutes(app);

// Handle production
if (process.env.NODE_ENV === 'production') {
	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));
}

app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

server.listen(servConf.port, () => console.log(`Listening on port ${servConf.port}!`));
