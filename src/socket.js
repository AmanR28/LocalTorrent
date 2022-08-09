const fileList = require('./fileList')

const connClient = (socket) => {
  console.log("Client Connected: " + socket.conn.remoteAddress);

  socket.on('hostFile', fp =>
    console.log('Host File Path ' + fp)
  );

  (function emitFileList() {
    setTimeout(() => {
      socket.emit('fileList', fileList);
      emitFileList()
    }, 1000); 
  }());
}

module.exports = connClient;