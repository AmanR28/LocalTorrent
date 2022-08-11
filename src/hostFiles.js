const { stat } = require('fs');
const path = require('path');
const ip = require('./utils/ip');

const list = [];

const addFile = (fp, cb) => {
  stat(fp, (err, data) => {
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

module.exports = {
  get: () => list,
  addFile
}