const config = require('./config');
const files = require('./files');
const hostFiles = require('./hostFiles');

const connClient = (socket) => {
  console.log("Client Connected: " + socket.conn.remoteAddress);

  socket.on('hostFile', fp => {
    console.log('Host File Path ' + fp);
    hostFiles.addFile(fp, (res) => {
      socket.emit('hostFileSuccess', res, hostFiles.get());
    })
  });

  (function emitFileList() {
    setTimeout(() => {
      socket.emit('fileList', files.get());
      emitFileList()
    }, config.INTERVAL_FILE_LIST); 
  }());
}

module.exports = connClient;