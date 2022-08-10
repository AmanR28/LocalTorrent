const dgram = require('dgram');
const bencode = require('bencode');
const config = require('./config');
const ip = require('./utils/ip');
const hostFiles = require('./hostFiles');
const files = require('./files');

const udpServer = dgram.createSocket("udp4");

console.log('IP : ' + ip.address)
console.log('BCAST : ' + ip.broadcast)

const udp = () => {
  udpServer.bind(config.BCAST_PORT, () => {
    udpServer.setBroadcast(true);
    setInterval(() => {
      var msg = bencode.encode(hostFiles.get());
      udpServer.send(msg, 0, msg.length, config.BCAST_PORT, ip.broadcast);
    }, 1000);
  });

  udpServer.on('listening', function () {
      var address = udpServer.address();
      console.log('UDP listening on ' + address.address + ":" + address.port);
      udpServer.setBroadcast(true);
  });

  udpServer.on('message', function (message, rinfo) {
    var result = bencode.decode(message, 'utf-8');
    console.log("Result", result);
  });
}

module.exports = udp;