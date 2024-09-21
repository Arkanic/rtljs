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
exports.getDeviceCount = getDeviceCount;
exports.getDeviceName = getDeviceName;
exports.getDeviceUSBStrings = getDeviceUSBStrings;
exports.getIndexBySerial = getIndexBySerial;
exports.open = open;
exports.close = close;
const koffi_1 = __importDefault(require("koffi"));
const baremetal = __importStar(require("./baremetal"));
const rtlsdr_device_1 = __importDefault(require("./rtlsdr-device"));
const util_1 = require("./util");
/**
 * Get the number of available devices
 *
 * @returns Current device count
 *
 * @example
 * ```js
 * console.log(rtljs.getDeviceCount()); // 1
 * ```
 */
function getDeviceCount() {
    return baremetal.rtlsdr_get_device_count();
}
/**
 * Get the device name of the specified index
 *
 * @param index Index of device to be named
 *
 * @returns The name of the device. Max length 256 bytes. May be null.
 *
 * @example
 * ```js
 * console.log(rtljs.getDeviceName(0)); // Generic RTL2832U OEM
 * ```
 */
function getDeviceName(index) {
    return baremetal.rtlsdr_get_device_name(index);
}
/**
 * Get USB device strings. Maximum length is 256 bytes.
 *
 * @param index the device index
 *
 * @returns manufacturer, serial, and product name, may be null
 *
 * @example
 * ```js
 * let strings = rtljs.getDeviceUSBStrings(0);
 * console.log(`${strings.manufacturer}, ${strings.product}, ${strings.serial});
 * ```
 */
function getDeviceUSBStrings(index) {
    let manufacturer = (0, util_1.charArrayAlloc)(64);
    let product = (0, util_1.charArrayAlloc)(64);
    let serial = (0, util_1.charArrayAlloc)(64);
    let result = baremetal.rtlsdr_get_device_usb_strings(index, manufacturer, product, serial);
    if (result !== 0)
        throw new Error(`Unknown Error [getDeviceUSBStrings(${index})]`);
    return {
        manufacturer: manufacturer[0],
        product: product[0],
        serial: serial[0]
    };
}
/**
 * Get device index by USB serial string descriptor.
 *
 * @param serial Serial string of the device
 *
 * @returns Device index of the first serial match
 */
function getIndexBySerial(serial) {
    let result = baremetal.rtlsdr_get_index_by_serial(serial);
    if (result === -1)
        throw new Error(`Name is NULL for serial ${serial}`);
    else if (result === -2)
        throw new Error(`No devices were found at all for serial ${serial}`);
    else if (result === -3)
        throw new Error(`Devices were found, but none with matching name for serial ${serial}`);
    else if (result < 0)
        throw new Error(`Unkown Error [getIndexBySerial(${serial})]`);
    else {
        return result;
    }
}
/**
 * Open RTLSDR device by index
 *
 * @param index Device index
 * @returns Device instance
 *
 * @example
 * ```js
 * let device = rtljs.open(0);
 * device.setCenterFreq(1090000000);
 * ```
 */
function open(index) {
    let devicePtr = [0];
    let result = baremetal.rtlsdr_open(devicePtr, index);
    if (result !== 0)
        throw new Error(`Unknown Error [open(${index})]`);
    let device = koffi_1.default.address(devicePtr[0]);
    return new rtlsdr_device_1.default(device);
}
/**
 * Close RTLSDR dev handle
 *
 * @param device RTLSDR device
 *
 * @example
 * ```js
 * rtljs.close(device);
 * ```
 */
function close(device) {
    let result = baremetal.rtlsdr_close(device.device);
    if (result !== 0)
        throw new Error("Unknown Error [close]");
    device.open = false;
}
