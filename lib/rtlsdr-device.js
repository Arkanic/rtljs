"use strict";
/*device
console.log("Devices: ", baremetal.rtlsdr_get_device_count());

let devicePtr = [0];
baremetal.rtlsdr_open(devicePtr, 0);
console.log(devicePtr);
let device = koffi.address(devicePtr[0]);
baremetal.rtlsdr_set_center_freq(device, 1090000000)
console.log(baremetal.rtlsdr_get_center_freq(device));
baremetal.rtlsdr_close(device);

xtal
let rtl_freq = [0];
let tuner_freq = [0];
baremetal.rtlsdr_get_xtal_freq(device, rtl_freq, tuner_freq);

//let rtl_freq_r = koffi.address(rtl_freq[0]);
//let tuner_freq_r = koffi.address(tuner_freq[0]);

console.log(rtl_freq, tuner_freq);

gains
let tunerType = baremetal.rtlsdr_tunerEnum[baremetal.rtlsdr_get_tuner_type(device)];
console.log(tunerType);

let tunerGains = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let len = baremetal.rtlsdr_get_tuner_gains(device, tunerGains);
console.log("size: " + len);
for(let i = 0; i < len; i++) {
    console.log(tunerGains[i]);
}

readSync

baremetal.rtlsdr_reset_buffer(device);


*/
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
Object.defineProperty(exports, "__esModule", { value: true });
const baremetal = __importStar(require("./baremetal"));
const util_1 = require("./util");
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
class RTLSDRDevice {
    /**
     * Raw C librtlsdr device (typed as void)
     */
    device;
    open;
    supportedGains;
    constructor(device) {
        this.device = device;
        this.open = true;
        this.supportedGains = this.getTunerGains();
    }
    checkOpen() {
        if (!this.open)
            throw new Error("Device is not open!");
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
     *
     * @example
     * ```js
     * let xtal = device.getXtalFreq();
     *
     * // e.g.
     * device.setXtalFreq(xtal.rtlFreq, xtal.tunerFreq);
     * ```
     */
    setXtalFreq(rtlFreq, tunerFreq) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
        if (result !== 0)
            throw new Error("Unknown Error [device.setXtalFreq]");
    }
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
    getXtalFreq() {
        this.checkOpen();
        let rtlFreqPtr = [0];
        let tunerFreqPtr = [0];
        let result = baremetal.rtlsdr_get_xtal_freq(this.device, rtlFreqPtr, tunerFreqPtr);
        if (result !== 0)
            throw new Error("Unknown Error [getXtalFreq]");
        return {
            rtlFreq: rtlFreqPtr[0],
            tunerFreq: rtlFreqPtr[0]
        };
    }
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
    getUSBStrings() {
        this.checkOpen();
        let manufacturer = (0, util_1.charArrayAlloc)(64);
        let product = (0, util_1.charArrayAlloc)(64);
        let serial = (0, util_1.charArrayAlloc)(64);
        let result = baremetal.rtlsdr_get_usb_strings(this.device, manufacturer, product, serial);
        if (result !== 0)
            throw new Error("Unknown Error [device.getUSBStrings]");
        return {
            manufacturer: manufacturer[0],
            product: product[0],
            serial: serial[0]
        };
    }
    /**
     * Write the device EEPROM
     *
     * @param data Buffer of data to be written
     * @param offset Address where the data should be written
     * @param len Length of the data
     */
    writeEEPROM(data, offset, len) {
        this.checkOpen();
        let result = baremetal.rtlsdr_write_eeprom(this.device, data, offset, len);
        if (result === -1)
            throw new Error("Device handle is invalid");
        else if (result === -2)
            throw new Error("EEPROM size is exceeded");
        else if (result === -3)
            throw new Error("No EEPROM was found");
        else if (result < 0)
            throw new Error("Unknown Error [device.writeEEPROM]");
    }
    /**
     * Read the device EEPROM
     *
     * @param offset Address where the data should be read from
     * @param len Length of the data
     *
     */
    readEEPROM(offset, len) {
        this.checkOpen();
        let buffer = (0, util_1.numberArrayAlloc)(len);
        let result = baremetal.rtlsdr_read_eeprom(this.device, buffer, offset, len);
        if (result === -1)
            throw new Error("Device handle is invalid");
        else if (result === -2)
            throw new Error("EEPROM size is exceeded");
        else if (result === -3)
            throw new Error("No EEPROM was found");
        else if (result < 0)
            throw new Error("Unknown Error [device.readEEPROM]");
        return buffer;
    }
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
    setCenterFreq(freq) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_center_freq(this.device, freq);
        if (result < 0)
            throw new Error("Unknown Error [device.setCenterFreq]");
    }
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
    getCenterFreq() {
        this.checkOpen();
        let freq = baremetal.rtlsdr_get_center_freq(this.device);
        return freq;
    }
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
    setFreqCorrection(ppm) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_freq_correction(this.device, ppm);
        if (result < 0)
            throw new Error("Unknown Error [device.setFreqCorrection]");
    }
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
    getFreqCorrection() {
        this.checkOpen();
        let ppm = baremetal.rtlsdr_get_freq_correction(this.device);
        return ppm;
    }
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
    getTunerType() {
        this.checkOpen();
        let tunerVal = baremetal.rtlsdr_get_tuner_type(this.device);
        return baremetal.rtlsdr_tunerEnum[tunerVal];
    }
    /**
     * Get a list of gains supported by the tuner.
     *
     * NOTE: The gains argument must be preallocated by the caller. If NULL is
     * being given instead, the number of available gain values will be returned.
     *
     * @returns Number of available (returned) gain values otherwise
     */
    getTunerGains() {
        this.checkOpen();
        let gainCount = baremetal.rtlsdr_get_tuner_gains(this.device, null);
        let gains = (0, util_1.numberArrayAlloc)(gainCount);
        let result = baremetal.rtlsdr_get_tuner_gains(this.device, gains);
        if (result < 0)
            throw new Error("Unknown Error [device.getTunerGains]");
        return gains;
    }
    /**
     * Set the gain for the device.
     * Manual gain mode must be enabled for this to work.
     *
     * Each device has a specific set of gains it supports. Gains are checked against pre-aquired array of gains by rtljs for validity.
     *
     * @param gain Measured in tenths of a dB, 115 means 11.5 dB.
     */
    setTunerGain(gain) {
        this.checkOpen();
        if (this.supportedGains.indexOf(gain) === -1)
            throw new Error(`RTLJS: Gain ${gain} not supported by device [device.setTunerGain]`);
        let result = baremetal.rtlsdr_set_tuner_gain(this.device, gain);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerGain]");
    }
    /**
     * Set the bandwidth for the device.
     *
     * @param bw Bandwidth in Hz. Zero means automatic BW selection.
     */
    setTunerBandwidth(bw) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_tuner_bandwidth(this.device, bw);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerBandwidth]");
    }
    /**
     * Get actual gain the device is configured to.
     *
     * @returns Gain in tenths of a dB, 115 means 11.5 dB.
     */
    getTunerGain() {
        this.checkOpen();
        let gain = baremetal.rtlsdr_get_tuner_gain(this.device);
        return gain;
    }
    /**
     * Set the intermediate frequency gain for the device.
     *
     * @param stage Intermediate frequency gain stage number (1 to 6 for E4000)
     * @param gain Measured in tenths of a dB, -30 means -3.0 dB.
     */
    setTunerIfGain(stage, gain) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_tuner_if_gain(this.device, stage, gain);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerIfGain]");
    }
    /**
     * Set the gain mode (automatic/manual) for the device.
     * Manual gain mode must be enabled for the gain setter function to work.
     *
     * @param manual Gain mode, 1 means manual gain mode shall be enabled.
     */
    setTunerGainMode(manual) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_tuner_gain_mode(this.device, manual);
        if (result < 0)
            throw new Error("Unknown Error [device.setTunerGainMode]");
    }
    /**
     * Set the sample rate for the device, also selects the baseband filters
     * according to the requested sample rate for tuners where this is possible.
     *
     * @param rate samp_rate the sample rate to be set, possible values are:
     * 		    225001 - 300000 Hz
     * 		    900001 - 3200000 Hz
     * 		    sample loss is to be expected for rates > 2400000
     */
    setSampleRate(rate) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_sample_rate(this.device, rate);
        if (result !== 0)
            throw new Error("Unknown Error [device.setSampleRate]");
    }
    /**
     * Get actual sample rate the device is configured to.
     *
     * @returns Sample rate in Hz
     */
    getSampleRate() {
        this.checkOpen();
        let rate = baremetal.rtlsdr_get_sample_rate(this.device);
        if (rate === 0)
            throw new Error("Unknown Error [device.getSampleRate]");
        return rate;
    }
    /**
     * Enable test mode that returns an 8 bit counter instead of the samples.
     * The counter is generated inside the RTL2832.
     *
     * @param on Test mode, 1 means enabled, 0 disabled
     */
    setTestmode(on) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_testmode(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setTestmode]");
    }
    /**
     * Enable or disable the internal digital AGC of the RTL2832.
     *
     * @param on digital AGC mode, 1 means enabled, 0 disabled
     */
    setAGCMode(on) {
        let result = baremetal.rtlsdr_set_agc_mode(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setAGCMode]");
    }
    /**
     * Enable or disable the direct sampling mode. When enabled, the IF mode
     * of the RTL2832 is activated, and rtlsdr_set_center_freq() will control
     * the IF-frequency of the DDC, which can be used to tune from 0 to 28.8 MHz
     * (xtal frequency of the RTL2832).
     *
     * @param on 0 means disabled, 1 I-ADC input enabled, 2 Q-ADC input enabled
     */
    setDirectSampling(on) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_direct_sampling(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setDirectSampling]");
    }
    /**
     * Get state of the direct sampling mode
     *
     * @returns -1 on error, 0 means disabled, 1 I-ADC input enabled
     *	    2 Q-ADC input enabled
     */
    getDirectSampling() {
        this.checkOpen();
        let ds = baremetal.rtlsdr_get_direct_sampling(this.device);
        if (ds === -1)
            throw new Error("Unknown Error [device.getDirectSampling]");
        return ds;
    }
    /**
     * Enable or disable offset tuning for zero-IF tuners, which allows to avoid
     * problems caused by the DC offset of the ADCs and 1/f noise.
     *
     * @param on 0 means disabled, 1 enabled
     */
    setOffsetTuning(on) {
        this.checkOpen();
        let result = baremetal.rtlsdr_set_offset_tuning(this.device, on);
        if (result !== 0)
            throw new Error("Unknown Error [device.setOffsetTuning]");
    }
    /**
     * Get state of the offset tuning mode
     *
     * @returns -1 on error, 0 means disabled, 1 enabled
     */
    getOffsetTuning() {
        this.checkOpen();
        let ot = baremetal.rtlsdr_get_offset_tuning(this.device);
        if (ot === -1)
            throw new Error("Unknown Error [device.getOffsetTuning]");
        return ot;
    }
    /**
     * Reset the device buffer
     */
    resetBuffer() {
        this.checkOpen();
        let result = baremetal.rtlsdr_reset_buffer(this.device);
        if (result !== 0)
            throw new Error("Unknown Error [device.resetBuffer]");
    }
    /**
     * read signal data from the device
     * array returned may be smaller than what was requested
     *
     * @param len Amount of data to return
     * @returns Buffer with signal data
     */
    readSync(len) {
        this.checkOpen();
        this.resetBuffer();
        let buffer = (0, util_1.numberArrayAlloc)(len);
        let n_read = [0];
        baremetal.rtlsdr_read_sync(this.device, buffer, 2048, n_read);
        buffer.length = n_read[0];
        return buffer;
    }
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
    readAsync(callback, buf_num, buf_len) {
        this.checkOpen();
    }
    /**
     * Cancels all pending async operations on the device.
     */
    cancelAsync() {
        this.checkOpen();
    }
}
exports.default = RTLSDRDevice;
