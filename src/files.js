const { stat } = require('fs');
const ip = require('./utils/ip');
var path = require('path');

let list = [
  {"id": 1,"name": "adfsdf","servers":["123r5125"]},
];

module.exports = {
  get: () => list,
};