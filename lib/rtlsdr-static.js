"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceUSBStrings = exports.getDeviceName = exports.getDeviceCount = void 0;
var baremetal_1 = require("./baremetal");
function digestCharPtr(charPtr) {
    var terminatingNullPos = charPtr.indexOf("\u0000");
    if (terminatingNullPos > 0) {
        var rawString = charPtr.toString();
        return rawString.substr(0, terminatingNullPos);
    }
    else {
        return null;
    }
}
/**
 * Get the number of available devices
 *
 * @returns Current device count
 */
function getDeviceCount() {
    return baremetal_1.librtlsdr.rtlsdr_get_device_count();
}
exports.getDeviceCount = getDeviceCount;
/**
 * Get the device name of the specified index
 *
 * @param index Index of device to be named
 *
 * @returns The name of the device. Max length 256 bytes. May be null.
 */
function getDeviceName(index) {
    return baremetal_1.librtlsdr.rtlsdr_get_device_name(index);
}
exports.getDeviceName = getDeviceName;
function getDeviceUSBStrings(index) {
    var manufacturer = Buffer.alloc(256).fill(0);
    var product = Buffer.alloc(256).fill(0);
    var serial = Buffer.alloc(256).fill(0);
    // @ts-ignore
    var result = baremetal_1.librtlsdr.rtlsdr_get_device_usb_strings(index, manufacturer, product, serial);
    if (result !== 0)
        throw new Error("Failed to open device #" + index + ": " + result);
    return {
        manufacturer: digestCharPtr(manufacturer),
        product: digestCharPtr(product),
        serial: digestCharPtr(serial)
    };
}
exports.getDeviceUSBStrings = getDeviceUSBStrings;
