"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var ref_napi_1 = __importDefault(require("ref-napi"));
var baremetal = __importStar(require("./baremetal"));
var baremetal_1 = require("./baremetal");
var rtlsdr_static_1 = require("./rtlsdr-static");
var RTLSDRDevice = /** @class */ (function () {
    function RTLSDRDevice(device) {
        this.device = device;
    }
    /**
     * Set crystal oscillator frequencies used for the RTL2832 and the tuner IC.
     *
     * Usually both ICs use the same clock. Changing the clock may make sense if
     * you are applying an external clock to the tuner or to compensate the
     * frequency (and samplerate) error caused by the original (cheap) crystal.
     *
     * NOTE: Call this function only if you fully understand the implications.
     *
     * @param rtlFreq Frequency value used to clock the RTL2832 in Hz
     * @param tunerFreq Frequency value used to clock the tuner IC in Hz
     */
    RTLSDRDevice.prototype.setXtalFreq = function (rtlFreq, tunerFreq) {
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
        if (result !== 0)
            throw new Error("Unknown Error [device.setXtalFreq]");
    };
    /**
     * Get crystal oscillator frequencies used for the RTL2832 and the tuner IC.
     *
     * Usually both ICs use the same clock.
     *
     * @returns Frequency value used to clock the RTL2832 and IC, in Hz
     */
    RTLSDRDevice.prototype.getXtalFreq = function () {
        var rtlFreq = ref_napi_1.default.alloc(baremetal.uint32Ptr);
        var tunerFreq = ref_napi_1.default.alloc(baremetal.uint32Ptr);
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_get_xtal_freq(this.device, rtlFreq, tunerFreq);
        if (result !== 0)
            throw new Error("Unknown Error [getXtalFreq]");
        return {
            rtlFreq: rtlFreq.deref(),
            tunerFreq: rtlFreq.deref()
        };
    };
    /**
     * Get USB device strings. Max size 256 bytes.
     *
     * @returns manufacturer, product, and serial strings. They may all be null.
     */
    RTLSDRDevice.prototype.getUSBStrings = function () {
        var manufacturer = Buffer.alloc(256).fill(0);
        var product = Buffer.alloc(256).fill(0);
        var serial = Buffer.alloc(256).fill(0);
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_get_usb_strings(this.device, manufacturer, product, serial);
        if (result !== 0)
            throw new Error("Unknown Error [device.getUSBStrings]");
        return {
            manufacturer: (0, rtlsdr_static_1.digestCharPtr)(manufacturer),
            product: (0, rtlsdr_static_1.digestCharPtr)(product),
            serial: (0, rtlsdr_static_1.digestCharPtr)(serial)
        };
    };
    /**
     * Write the device EEPROM
     *
     * @param data Buffer of data to be written
     * @param offset Address where the data should be written
     * @param len Length of the data
     */
    RTLSDRDevice.prototype.writeEEPROM = function (data, offset, len) {
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_write_eeprom(this.device, data, offset, len);
        if (result === -1)
            throw new Error("Device handle is invalid");
        else if (result === -2)
            throw new Error("EEPROM size is exceeded");
        else if (result === -3)
            throw new Error("No EEPROM was found");
        else if (result < 0)
            throw new Error("Unknown Error [device.writeEEPROM]");
    };
    /**
     * Read the device EEPROM
     *
     * @param offset Address where the data should be read from
     * @param len Length of the data
     *
     */
    RTLSDRDevice.prototype.readEEPROM = function (offset, len) {
        var data = ref_napi_1.default.alloc(baremetal.uint8Ptr);
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_read_eeprom(this.device, data, offset, len);
        if (result === -1)
            throw new Error("Device handle is invalid");
        else if (result === -2)
            throw new Error("EEPROM size is exceeded");
        else if (result === -3)
            throw new Error("No EEPROM was found");
        else if (result < 0)
            throw new Error("Unknown Error [device.readEEPROM]");
        return data.deref();
    };
    /**
     * Set tune frequency of the device
     *
     * @param freq Frequency to tune to in Hz
     */
    RTLSDRDevice.prototype.setCenterFreq = function (freq) {
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_center_freq(this.device, freq);
        if (result < 0)
            throw new Error("Unknown Error [device.setCenterFreq]");
    };
    /**
     * Get actual frequency the device is tuned to.
     *
     * @returns Frequency in Hz
     */
    RTLSDRDevice.prototype.getCenterFreq = function () {
        // @ts-ignore
        var freq = baremetal_1.librtlsdr.rtlsdr_get_center_freq(this.device);
        if (freq === 0)
            throw new Error("Unknown Error [device.getCenterFreq]");
        return freq;
    };
    /**
     * Set the frequency correction value for the device.
     *
     * @param ppm Correction value in parts per million (ppm)
     */
    RTLSDRDevice.prototype.setFreqCorrection = function (ppm) {
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_freq_correction(this.device, ppm);
        if (result < 0)
            throw new Error("Unknown Error [device.setFreqCorrection]");
    };
    /**
     * Get actual frequency correction value of the device.
     *
     * @returns Correction value in parts per million (ppm)
     */
    RTLSDRDevice.prototype.getFreqCorrection = function () {
        // @ts-ignore
        var ppm = baremetal_1.librtlsdr.rtlsdr_get_freq_correction(this.device);
        return ppm;
    };
    return RTLSDRDevice;
}());
exports.default = RTLSDRDevice;
