const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const config = require('./src/config');
const connClient = require('./src/socket')

app.use(express.static(__dirname + '/public')); 

// Host Server
server.listen(config.port, () =>
  console.log('Host Success @ ' + config.port)
);

// Socket
io.on('connection', socket => connClient(socket));