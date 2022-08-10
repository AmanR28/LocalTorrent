const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const config = require('./src/config');
const connClient = require('./src/socket');
const udp = require('./src/udp');

app.use(express.static(__dirname + '/public')); 

// Host Server
server.listen(config.PORT, () =>
  console.log('Host Success @ ' + config.PORT)
);

// Socket
io.on('connection', socket => connClient(socket));

// UDP
udp();