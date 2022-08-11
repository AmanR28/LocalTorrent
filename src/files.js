const { stat } = require('fs');
const ip = require('./utils/ip');
var path = require('path');

let list = [];

const addFile = (file) => {
  let exist = false;

  list.forEach(f => {
    if (f.id == file.id) {
      if (!f.servers.includes(file.server))
        f.servers.push(file.server);
      exist = true;
    }
  })

  if (!exist) 
    list.push({
      "id": file.id,
      "name": file.name,
      "path": file.path,
      "servers": [file.server]      
    })
}

module.exports = {
  get: () => list,
  addFile
};