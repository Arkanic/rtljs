const rtljs = require("../");

const device = rtljs.open(0);

device.setCenterFreq(1090 * rtljs.mhz);

device.readAsync((buf, len, ctx) => {
    console.log(JSON.stringify(buf));
}, 0, 512);

rtljs.close(device);