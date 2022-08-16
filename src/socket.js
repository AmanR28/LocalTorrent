const config = require('./config');
const files = require('./files');
const hostFiles = require('./hostFiles');
const download = require('./download');

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

  socket.on('setDownloadPath', dp => {
    download.setPath(dp, (err) => {
      err ? socket.emit('checkDownloadPath', false) : socket.emit('checkDownloadPath', true);
    })
  })

  socket.on('fileDownload', id => download.file(id, (res) => {
    socket.emit('fileDownloading', res);
  }))  
}

module.exports = connClient;