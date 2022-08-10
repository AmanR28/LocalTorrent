const dgram = require('dgram');
const config = require('./config');
const ip = require('./utils/ip');

const udpServer = dgram.createSocket("udp4");

let rand = "";

console.log('IP : ' + ip.address)
console.log('BCAST : ' + ip.broadcast)

const udp = () => {
  udpServer.bind(config.BCAST_PORT, () => {
    udpServer.setBroadcast(true);
    setInterval(() => {
      rand = Math.random().toString();
      var message = Buffer.from(rand);
      udpServer.send(message, 0, message.length, config.BCAST_PORT, ip.broadcast, () => console.log("Sent : " + message))
    }, 1000);
  });

  udpServer.on('listening', function () {
      var address = udpServer.address();
      console.log('UDP listening on ' + address.address + ":" + address.port);
      udpServer.setBroadcast(true);
  });

  udpServer.on('message', function (message, rinfo) {
      if (message != rand) 
        console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
  });
}

module.exports = udp;