const fs = require('fs');
const path = require('path');
var ss = require('socket.io-stream');
const ip = require('./utils/ip');
const files = require('./files');


const list = [];

const addFile = (fp, cb) => {
  fs.stat(fp, (err, data) => {
    if (err) {
      console.error(err)
      cb("HOST_FILE_FAIL");
    }
    else {
      let id = path.basename(fp) + ' ' + data.size;

      let exist = false;
      list.forEach(f => {
        if (f.id == id) 
          exist = true;
      })

      if (exist) cb("HOST_FILE_EXIST");
      else {
        let file = {
          "id": id,
          "name": path.basename(fp),
          "path": fp,
          "server": ip.address
        }
        list.push(file);
        cb("HOST_FILE_SUCCESS");
      }
    }
  });
}

const start = (socket) => {
  ss(socket).on('file', (stream, data) => {
    var file = files.get().find(f => f.id == data.id);
    console.log("Sending File : " + file.id);
    fs.createReadStream(file.path).pipe(stream);
  });
}

module.exports = {
  get: () => list,
  addFile,
  start
}