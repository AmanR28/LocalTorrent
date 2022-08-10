const os = require('os')

let IP = {};

let IPs = Object.values(os.networkInterfaces())
  .reduce((r, a) => {
    r = r.concat(a)
    return r;
  }, [])
  .filter(({ family, internal }) =>
    family.toLowerCase().indexOf('v4') >= 0 && !internal);

IP = IPs[0];

let ipAdr = IP.address.split('.'),
  subnets = IP.netmask.split('.'),
  netAdr = [], broadcastAdr = [];

for (let i in ipAdr) {
  netAdr[i] = ipAdr[i] & subnets[i];
}
for (let i in netAdr) {
    broadcastAdr[i] = netAdr[i] | ~subnets[i] + 256;
}
IP.broadcast = broadcastAdr.join('.');

module.exports = IP;