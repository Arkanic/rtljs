"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTLSDRDevice = exports.rtlsdr_tunerEnum = exports.khz = exports.mhz = exports.ghz = exports.close = exports.open = exports.getIndexBySerial = exports.getDeviceUSBStrings = exports.getDeviceName = exports.getDeviceCount = void 0;
var rtlsdr_static_1 = require("./rtlsdr-static");
Object.defineProperty(exports, "getDeviceCount", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceCount; } });
Object.defineProperty(exports, "getDeviceName", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceName; } });
Object.defineProperty(exports, "getDeviceUSBStrings", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceUSBStrings; } });
Object.defineProperty(exports, "getIndexBySerial", { enumerable: true, get: function () { return rtlsdr_static_1.getIndexBySerial; } });
Object.defineProperty(exports, "open", { enumerable: true, get: function () { return rtlsdr_static_1.open; } });
Object.defineProperty(exports, "close", { enumerable: true, get: function () { return rtlsdr_static_1.close; } });
var baremetal_1 = require("./baremetal");
Object.defineProperty(exports, "rtlsdr_tunerEnum", { enumerable: true, get: function () { return baremetal_1.rtlsdr_tunerEnum; } });
var rtlsdr_device_1 = __importDefault(require("./rtlsdr-device"));
exports.RTLSDRDevice = rtlsdr_device_1.default;
var ghz = 1000000000;
exports.ghz = ghz;
var mhz = 1000000;
exports.mhz = mhz;
var khz = 1000;
exports.khz = khz;
