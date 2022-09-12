const rtljs = require("../");

const device = rtljs.open(0);

device.setCenterFreq(1090 * rtljs.mhz);

console.log(JSON.stringify(device.readSync(512)));

rtljs.close(device);