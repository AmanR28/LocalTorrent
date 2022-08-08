const express = require('express');
const config = require('./src/config');

const app = express();
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/public')); 

server.listen(config.port, () => console.log('Host Success'));