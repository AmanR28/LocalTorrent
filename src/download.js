const fs = require('fs');
const path = require('path');
var io = require('socket.io-client');
var ss = require('socket.io-stream');
const files = require('./files');

let downloadPath = "";

const setPath = (dp, cb) => {
    fs.access(dp, (err) => {
      if (err) cb(err);
      else {
        downloadPath = dp;
        console.log("Download Path Set to " + downloadPath);
        cb();
      }
    })
}

const downloadFile = (id, res) => {
  var file = files.get().find(f => f.id == id);

    if (downloadPath && file) {
        const host = "http://" + file.servers[0] + ":3000";
        var socket = io.connect(host);
        var stream = ss.createStream();

        console.log("Downloading file " + file.id);
        res("Downloading file");

        ss(socket).emit('file', stream, {id});
        stream.pipe(fs.createWriteStream(path.join(downloadPath, file.name))); 
        stream.on('end', () => {
            res("File Downloaded");
        })
    }
    else {
        console.log("Error Downloading file : " + id);
        res("Error Downloading File");
    }
}

module.exports = {
    setPath,
    file: downloadFile
    // start
};