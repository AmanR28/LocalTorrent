const fs = require('fs');
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
        console.log("Downloading file " + file.id);
        res(true);
    }
    else {
        console.log("Error Downloading file : " + id);
        res(false); "Error Downloading File";
    }
}


module.exports = {
    setPath,
    file : downloadFile
};