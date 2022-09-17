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
var ffi_napi_1 = __importDefault(require("ffi-napi"));
var baremetal = __importStar(require("./baremetal"));
var baremetal_1 = require("./baremetal");
var rtlsdr_static_1 = require("./rtlsdr-static");
var charPtr = ref_napi_1.default.refType(ref_napi_1.default.types.char);
var voidPtr = ref_napi_1.default.refType(ref_napi_1.default.types.void);
/**
 * Opened RTLSDR device.
 *
 * NOTE: Do not create an instance of this class directly (unless for some weird reason you want to provide a pure C dev* buffer)
 *
 * @example
 * ```js
 * //Proper form
 * let device = rtljs.open(index);
 *
 * //Improper form
 * // C device Ptr (typed as void) from librtlsdr rtlsdr_open
 * let device = new RTLSDRDevice(devPtr);
 * ```
 */
var RTLSDRDevice = /** @class */ (function () {
    function RTLSDRDevice(device) {
        this.device = device;
        this.open = true;
    }
    RTLSDRDevice.prototype.checkOpen = function () {
        if (!this.open)
            throw new Error("Device is not open!");
    };
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
     *
     * @example
     * ```js
     * let xtal = device.getXtalFreq();
     *
     * // e.g.
     * device.setXtalFreq(xtal.rtlFreq, xtal.tunerFreq);
     * ```
     */
    RTLSDRDevice.prototype.setXtalFreq = function (rtlFreq, tunerFreq) {
        this.checkOpen();
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
     *
     * @example
     * ```js
     * let xtal = device.getXtalFreq();
     *
     * console.log(`${xtal.rtlFreq}, ${xtal.tunerFreq}`); // <RTL Freq in Hz>, <Tuner Freq in Hz>
     * ```
     */
    RTLSDRDevice.prototype.getXtalFreq = function () {
        this.checkOpen();
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
     * Get USB device strings. Max size 256 bytes. Alike to `rtljs.getDeviceUSBStrings(index)`.
     *
     * @returns manufacturer, product, and serial strings. They may all be null.
     *
     * @example
     * ```js
     * let strings = device.getUSBStrings();
     *
     * console.log(`${strings.manufacturer}, ${strings.product}, ${strings.serial}`);
     * ```
     */
    RTLSDRDevice.prototype.getUSBStrings = function () {
        this.checkOpen();
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
        this.checkOpen();
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
        this.checkOpen();
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
     *
     * @example
     * ```js
     * device.setCenterFreq(1090000000); // 1090MHz (1090*10^6Hz)
     * ```
     */
    RTLSDRDevice.prototype.setCenterFreq = function (freq) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_center_freq(this.device, freq);
        if (result < 0)
            throw new Error("Unknown Error [device.setCenterFreq]");
    };
    /**
     * Get actual frequency the device is tuned to.
     *
     * @returns Frequency in Hz
     *
     * @example
     * ```js
     * let freq = device.getCenterFreq();
     *
     * console.log(freq); // 1090000000
     * ```
     */
    RTLSDRDevice.prototype.getCenterFreq = function () {
        this.checkOpen();
        // @ts-ignore
        var freq = baremetal_1.librtlsdr.rtlsdr_get_center_freq(this.device);
        return freq;
    };
    /**
     * Set the frequency correction value for the device.
     *
     * @param ppm Correction value in parts per million (ppm)
     *
     * @example
     * ```js
     * device.setFreqCorrection(1); // 1ppm correction
     * ```
     */
    RTLSDRDevice.prototype.setFreqCorrection = function (ppm) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_freq_correction(this.device, ppm);
        if (result < 0)
            throw new Error("Unknown Error [device.setFreqCorrection]");
    };
    /**
     * Get actual frequency correction value of the device.
     *
     * @returns Correction value in parts per million (ppm)
     *
     * @example
     * ```js
     * let ppm = device.getFreqCorrection();
     * console.log(ppm); // 1
     * ```
     */
    RTLSDRDevice.prototype.getFreqCorrection = function () {
        this.checkOpen();
        // @ts-ignore
        var ppm = baremetal_1.librtlsdr.rtlsdr_get_freq_correction(this.device);
        return ppm;
    };
    /**
     * Get the tuner type.
     *
     * @returns RTLSDR_TUNER_UNKNOWN on error, tuner type otherwise
     *
     * @example
     * ```js
     * let type = device.getTunerType();
     *
     * console.log(type); // RTLSDR_TUNER_R820T
     * ```
     */
    RTLSDRDevice.prototype.getTunerType = function () {
        this.checkOpen();
        // @ts-ignore
        var tunerVal = baremetal_1.librtlsdr.rtlsdr_get_tuner_type(this.device);
        return baremetal.rtlsdr_tunerEnum[tunerVal];
    };
    /**
     * Get a list of gains supported by the tuner.
     *
     * NOTE: The gains argument must be preallocated by the caller. If NULL is
     * being given instead, the number of available gain values will be returned.
     *
     * @param gains Array of gain values. In tenths of a dB, 115 means 11.5 dB.
     * @returns Number of available (returned) gain values otherwise
     */
    RTLSDRDevice.prototype.getTunerGains = function (gains) {
        this.checkOpen();
        var gBuf;
        if (gains)
            gBuf = Buffer.from(gains);
        else
            gBuf = ref_napi_1.default.NULL;
        // @ts-ignore
        var gain = baremetal_1.librtlsdr.rtlsdr_get_tuner_gains(this.device, gBuf);
        if (gain < 0)
            throw new Error("Unknown Error [device.getTunerGains]");
        return gain;
    };
    /**
     * Set the gain for the device.
     * Manual gain mode must be enabled for this to work.
     *
     * Valid gain values (in tenths of a dB) for the E4000 tuner:
     * -10, 15, 40, 65, 90, 115, 140, 165, 190,
     * 215, 240, 290, 340, 420, 430, 450, 470, 490
     *
     * Valid gain values may be queried with rtlsdr_get_tuner_gains function.
     *
     * @param gain Measured in tenths of a dB, 115 means 11.5 dB.
     */
    RTLSDRDevice.prototype.setTunerGain = function (gain) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_tuner_gain(this.device, gain);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerGain]");
    };
    /**
     * Set the bandwidth for the device.
     *
     * @param bw Bandwidth in Hz. Zero means automatic BW selection.
     */
    RTLSDRDevice.prototype.setTunerBandwidth = function (bw) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_tuner_bandwidth(this.device, bw);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerBandwidth]");
    };
    /**
     * Get actual gain the device is configured to.
     *
     * @returns Gain in tenths of a dB, 115 means 11.5 dB.
     */
    RTLSDRDevice.prototype.getTunerGain = function () {
        this.checkOpen();
        // @ts-ignore
        var gain = baremetal_1.librtlsdr.rtlsdr_get_tuner_gain(this.device);
        if (gain === 0)
            throw new Error("Unknown Error [device.getTunerGain]");
        return gain;
    };
    /**
     * Set the intermediate frequency gain for the device.
     *
     * @param stage Intermediate frequency gain stage number (1 to 6 for E4000)
     * @param gain Measured in tenths of a dB, -30 means -3.0 dB.
     */
    RTLSDRDevice.prototype.setTunerIfGain = function (stage, gain) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_tuner_if_gain(this.device, stage, gain);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerIfGain]");
    };
    /**
     * Set the gain mode (automatic/manual) for the device.
     * Manual gain mode must be enabled for the gain setter function to work.
     *
     * @param manual Gain mode, 1 means manual gain mode shall be enabled.
     */
    RTLSDRDevice.prototype.setTunerGainMode = function (manual) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_tuner_gain_mode(this.device, manual);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerGainMode]");
    };
    /**
     * Set the sample rate for the device, also selects the baseband filters
     * according to the requested sample rate for tuners where this is possible.
     *
     * @param rate samp_rate the sample rate to be set, possible values are:
     * 		    225001 - 300000 Hz
     * 		    900001 - 3200000 Hz
     * 		    sample loss is to be expected for rates > 2400000
     */
    RTLSDRDevice.prototype.setSampleRate = function (rate) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_sample_rate(this.device, rate);
        if (result !== 0)
            throw new Error("Unknown Error [device.setSampleRate]");
    };
    /**
     * Get actual sample rate the device is configured to.
     *
     * @returns Sample rate in Hz
     */
    RTLSDRDevice.prototype.getSampleRate = function () {
        this.checkOpen();
        // @ts-ignore
        var rate = baremetal_1.librtlsdr.rtlsdr_get_sample_rate(this.device);
        if (rate === 0)
            throw new Error("Unknown Error [device.getSampleRate]");
        return rate;
    };
    /**
     * Enable test mode that returns an 8 bit counter instead of the samples.
     * The counter is generated inside the RTL2832.
     *
     * @param on Test mode, 1 means enabled, 0 disabled
     */
    RTLSDRDevice.prototype.setTestmode = function (on) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_testmode(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setTestmode]");
    };
    /**
     * Enable or disable the internal digital AGC of the RTL2832.
     *
     * @param on digital AGC mode, 1 means enabled, 0 disabled
     */
    RTLSDRDevice.prototype.setAGCMode = function (on) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_agc_mode(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setAGCMode]");
    };
    /**
     * Enable or disable the direct sampling mode. When enabled, the IF mode
     * of the RTL2832 is activated, and rtlsdr_set_center_freq() will control
     * the IF-frequency of the DDC, which can be used to tune from 0 to 28.8 MHz
     * (xtal frequency of the RTL2832).
     *
     * @param on 0 means disabled, 1 I-ADC input enabled, 2 Q-ADC input enabled
     */
    RTLSDRDevice.prototype.setDirectSampling = function (on) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_direct_sampling(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setDirectSampling]");
    };
    /**
     * Get state of the direct sampling mode
     *
     * @returns -1 on error, 0 means disabled, 1 I-ADC input enabled
     *	    2 Q-ADC input enabled
     */
    RTLSDRDevice.prototype.getDirectSampling = function () {
        this.checkOpen();
        // @ts-ignore
        var ds = baremetal_1.librtlsdr.rtlsdr_get_direct_sampling(this.device);
        if (ds === -1)
            throw new Error("Unknown Error [device.getDirectSampling]");
        return ds;
    };
    /**
     * Enable or disable offset tuning for zero-IF tuners, which allows to avoid
     * problems caused by the DC offset of the ADCs and 1/f noise.
     *
     * @param on 0 means disabled, 1 enabled
     */
    RTLSDRDevice.prototype.setOffsetTuning = function (on) {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_offset_tuning(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setOffsetTuning]");
    };
    /**
     * Get state of the offset tuning mode
     *
     * @returns -1 on error, 0 means disabled, 1 enabled
     */
    RTLSDRDevice.prototype.getOffsetTuning = function () {
        this.checkOpen();
        // @ts-ignore
        var ot = baremetal_1.librtlsdr.rtlsdr_get_offset_tuning(this.device);
        if (ot === 0)
            throw new Error("Unknown Error [device.getOffsetTuning]");
        return ot;
    };
    /**
     * Reset the device buffer
     */
    RTLSDRDevice.prototype.resetBuffer = function () {
        this.checkOpen();
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_reset_buffer(this.device);
        if (result !== 0)
            throw new Error("Unknown Error [device.resetBuffer]");
    };
    /**
     * read signal data from the device
     *
     * @param len Amount of data to return
     * @returns Buffer with signal data
     */
    RTLSDRDevice.prototype.readSync = function (len) {
        this.checkOpen();
        this.resetBuffer();
        var buffer = Buffer.alloc(len).fill(0);
        var n = ref_napi_1.default.alloc(ref_napi_1.default.types.int);
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_read_sync(this.device, buffer, len, n);
        return buffer;
    };
    /**
     * Read samples from the device asynchronously. This function will block until
     * it is being canceled using cancelAsync()
     *
     * @param callback Callback function to return received samples (buf:number[], len:number, ctx:void)
     * @param buf_num optional buffer count, buf_num * buf_len = overall buffer size
     *		  set to 0 for default buffer count (15)
     * @param buf_len optional buffer length, must be multiple of 512,
     *		  should be a multiple of 16384 (URB size), set to 0
     *		  for default buffer length (16 * 32 * 512)
     *
    **/
    RTLSDRDevice.prototype.readAsync = function (callback, buf_num, buf_len) {
        this.checkOpen();
        var rtlsdrCallback = ffi_napi_1.default.Callback("void", [charPtr, "uint32", voidPtr], callback);
        // @ts-ignore
        baremetal_1.librtlsdr.rtlsdr_read_async.async(this.device, rtlsdrCallback, ref_napi_1.default.NULL, buf_num, buf_len, function (err, res) { });
    };
    /**
     * Cancels all pending async operations on the device.
     */
    RTLSDRDevice.prototype.cancelAsync = function () {
        var _this = this;
        this.checkOpen();
        // @ts-ignore
        baremetal_1.librtlsdr.rtlsdr_cancel_async.async(this.device, function (err, res) {
            if (res < 0) {
                (0, rtlsdr_static_1.close)(_this);
                console.error("Error trying to close device [device.cancelAsync]");
            }
        });
    };
    return RTLSDRDevice;
}());
exports.default = RTLSDRDevice;
