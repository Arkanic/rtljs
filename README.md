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
console.log(rtljs.getDeviceCount());
console.log(rtljs.getDeviceName(0));

let device = rtljs.open(0);
device.setCenterFreq(1090000000); // 1090MHz

// raw IQ data
device.resetBuffer();
let data = device.readSync(512);
console.log(JSON.stringify(data));
```

## API
TSDoc API available at [https://arkanic.github.io/rtljs/](https://arkanic.github.io/rtljs/)

## About
Made by [Arkanic](https://github.com/Arkanic)

MIT License