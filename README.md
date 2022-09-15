# RTLjs
Node.js interface for librtlsdr, using FFI-NAPI

Works with modern versions of node (v14-16 etc.), unlike alternate packages on NPM

Only tested on Linux, but if you ask me, I can very easily add windows/macos support.

## Installation
### Prerequisites
This module requires [librtlsdr](https://github.com/steve-m/librtlsdr). This package in turn requires [libusb](https://libusb.info/).

Librtlsdr is a package on most package repositories.

Linux:
```sudo apt-get install librtlsdr-dev```

### Package
```npm i rtljs```

## Usage
The package is written in ts and compiled to js, so ts typings are automatically provided with the package.


Using ES:
```js
import * as rtljs from "rtljs";
```

Node require():
```js
const rtljs = require("rtljs");
```

Sample Usage:
```js
console.log(rtljs.getDeviceCount()); // 1
console.log(rtljs.getDeviceName(0)); // Generic RTL R820T2

let device = rtljs.open(0);
device.setCenterFreq(1090 * rtljs.mhz); // 1090000000

// raw IQ data
device.resetBuffer(); // reset buffer to prevent communication data from appearing as radio data
let data = device.readSync(512); // read 512b
console.log(JSON.stringify(data)); // [128, 127, 128... etc

rtljs.close(device);
```

## Common Fixes
### Nothing happening when i use readSync/Async, program just hangs
remember to use device.resetBuffer() before using read commands
### Can't access device
you probably forgot to use close() in your code to end the device when the program ended. Reset your usb ports and this should now work fine.

## API
TSDoc API available at [https://arkanic.github.io/rtljs/](https://arkanic.github.io/rtljs/)

[Examples are available here](https://github.com/Arkanic/rtljs/tree/main/example)

## Broken Stuff
**Easy Fixes:**
- There are no bias functions at the moment
- ReadGains does not properly access c array, will either not work entirely or will only return the first item

**??wtf??:**
- cancelAsync refuses to work, likely some obscure multithreading error with ffi-napi (which happens to hate multithreading)

## About
Made by [Arkanic](https://github.com/Arkanic)

MIT License
