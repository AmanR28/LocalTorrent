const { stat } = require('fs');
const ip = require('./utils/ip');
var path = require('path');

let list = [
  {"id": "ad123","name": "adfsdf", "servers": ["123r5125"]},
];

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
      "servers": [file.server]      
    })
}

module.exports = {
  get: () => list,
  addFile
};