const { stat } = require('fs');
const path = require('path');
const ip = require('./utils/ip');

const list = [
  {"id": 1,"name": "A", "server": ip.address},
  {"id": 2,"name": "B", "server": ip.address}
];

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
          "server": ip.address
        }
        list.push(file);
        cb("HOST_FILE_SUCCESS");
      }
    }
    console.log("Hosted File List : ", list);
  });
}

module.exports = {
  get: () => list,
  addFile
}