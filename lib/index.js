"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baremetal = exports.RTLSDRDevice = exports.rtlsdr_tunerEnum = exports.khz = exports.mhz = exports.ghz = exports.close = exports.open = exports.getIndexBySerial = exports.getDeviceUSBStrings = exports.getDeviceName = exports.getDeviceCount = void 0;
const rtlsdr_static_1 = require("./rtlsdr-static");
Object.defineProperty(exports, "getDeviceCount", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceCount; } });
Object.defineProperty(exports, "getDeviceName", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceName; } });
Object.defineProperty(exports, "getDeviceUSBStrings", { enumerable: true, get: function () { return rtlsdr_static_1.getDeviceUSBStrings; } });
Object.defineProperty(exports, "getIndexBySerial", { enumerable: true, get: function () { return rtlsdr_static_1.getIndexBySerial; } });
Object.defineProperty(exports, "open", { enumerable: true, get: function () { return rtlsdr_static_1.open; } });
Object.defineProperty(exports, "close", { enumerable: true, get: function () { return rtlsdr_static_1.close; } });
const baremetal_1 = require("./baremetal");
Object.defineProperty(exports, "rtlsdr_tunerEnum", { enumerable: true, get: function () { return baremetal_1.rtlsdr_tunerEnum; } });
const baremetal = __importStar(require("./baremetal"));
exports.baremetal = baremetal;
const rtlsdr_device_1 = __importDefault(require("./rtlsdr-device"));
exports.RTLSDRDevice = rtlsdr_device_1.default;
const ghz = 1000000000;
exports.ghz = ghz;
const mhz = 1000000;
exports.mhz = mhz;
const khz = 1000;
exports.khz = khz;
