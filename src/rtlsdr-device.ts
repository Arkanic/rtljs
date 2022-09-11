import ref from "ref-napi";
import ffi from "ffi-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";
import {DeviceUSBStrings, digestCharPtr} from "./rtlsdr-static";

/**
 * Contains rtl and tuner crystal oscillating frequency
 */
export interface XtalFreq {
    /**
     * RTL crystal oscillating frequency
     */
    rtlFreq:number;
    /**
     * Tuner crysta oscillating frequency
     */
    tunerFreq:number;
}

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
export default class RTLSDRDevice {
    /**
     * Raw C librtlsdr device (typed as void)
     */
    device:void;
    open:boolean;

    constructor(device:void) {
        this.device = device;
        this.open = true;
    }

    private checkOpen() {
        if(!this.open) throw new Error("Device is not open!");
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
    setXtalFreq(rtlFreq:number, tunerFreq:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
        if(result !== 0) throw new Error("Unknown Error [device.setXtalFreq]");
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
    getXtalFreq():XtalFreq {
        this.checkOpen();
        let rtlFreq = ref.alloc(baremetal.uint32Ptr);
        let tunerFreq = ref.alloc(baremetal.uint32Ptr);

        // @ts-ignore
        let result = librtlsdr.rtlsdr_get_xtal_freq(this.device, rtlFreq, tunerFreq);
        if(result !== 0) throw new Error("Unknown Error [getXtalFreq]");

        return {
            rtlFreq: rtlFreq.deref(),
            tunerFreq: rtlFreq.deref()
        }
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
    getUSBStrings():DeviceUSBStrings {
        this.checkOpen();
        let manufacturer = Buffer.alloc(256).fill(0);
        let product = Buffer.alloc(256).fill(0);
        let serial = Buffer.alloc(256).fill(0);

        // @ts-ignore
        let result = librtlsdr.rtlsdr_get_usb_strings(this.device, manufacturer, product, serial);
        if(result !== 0) throw new Error("Unknown Error [device.getUSBStrings]");

        return {
            manufacturer: digestCharPtr(manufacturer),
            product: digestCharPtr(product),
            serial: digestCharPtr(serial)
        }
    }

    /**
     * Write the device EEPROM
     * 
     * @param data Buffer of data to be written
     * @param offset Address where the data should be written
     * @param len Length of the data
     */
    writeEEPROM(data:ref.Pointer<number>, offset:number, len:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_write_eeprom(this.device, data, offset, len);
        if(result === -1) throw new Error("Device handle is invalid");
        else if(result === -2) throw new Error("EEPROM size is exceeded");
        else if(result === -3) throw new Error("No EEPROM was found");
        else if(result < 0) throw new Error("Unknown Error [device.writeEEPROM]");
    }

    /**
     * Read the device EEPROM
     * 
     * @param offset Address where the data should be read from
     * @param len Length of the data
     * 
     */
    readEEPROM(offset:number, len:number):number {
        this.checkOpen();
        let data = ref.alloc(baremetal.uint8Ptr);
        
        // @ts-ignore
        let result = librtlsdr.rtlsdr_read_eeprom(this.device, data, offset, len);
        if(result === -1) throw new Error("Device handle is invalid");
        else if(result === -2) throw new Error("EEPROM size is exceeded");
        else if(result === -3) throw new Error("No EEPROM was found");
        else if(result < 0) throw new Error("Unknown Error [device.readEEPROM]");

        return data.deref();
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
    setCenterFreq(freq:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_center_freq(this.device, freq);
        if(result < 0) throw new Error("Unknown Error [device.setCenterFreq]");
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
    getCenterFreq():number {
        this.checkOpen();
        // @ts-ignore
        let freq = librtlsdr.rtlsdr_get_center_freq(this.device);

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
    setFreqCorrection(ppm:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_freq_correction(this.device, ppm);
        if(result < 0) throw new Error("Unknown Error [device.setFreqCorrection]");
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
    getFreqCorrection():number {
        this.checkOpen();
        // @ts-ignore
        let ppm = librtlsdr.rtlsdr_get_freq_correction(this.device);
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
    getTunerType():string {
        this.checkOpen();
        // @ts-ignore
        let tunerVal = librtlsdr.rtlsdr_get_tuner_type(this.device);

        return baremetal.rtlsdr_tunerEnum[tunerVal];
    }

    /**
     * Get a list of gains supported by the tuner.
     *
     * NOTE: The gains argument must be preallocated by the caller. If NULL is
     * being given instead, the number of available gain values will be returned.
     * 
     * @param gains Array of gain values. In tenths of a dB, 115 means 11.5 dB.
     * @returns Number of available (returned) gain values otherwise
     */
    getTunerGains(gains:Array<number>|null):number {
        this.checkOpen();
        let gBuf;
        if(gains) gBuf = Buffer.from(gains);
        else gBuf = ref.NULL;
        // @ts-ignore
        let gain = librtlsdr.rtlsdr_get_tuner_gains(this.device, gBuf);
        if(gain < 0) throw new Error("Unknown Error [device.getTunerGains]");

        return gain;
    }

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
    setTunerGain(gain:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_tuner_gain(this.device, gain);
        if(result < 0) throw new Error("Unknown Error [device.setTunerGain]");
    }

    /**
     * Set the bandwidth for the device.
     * 
     * @param bw Bandwidth in Hz. Zero means automatic BW selection.
     */
    setTunerBandwidth(bw:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_tuner_bandwidth(this.device, bw);
        if(result < 0) throw new Error("Unknown Error [device.setTunerBandwidth]");
    }

    /**
     * Get actual gain the device is configured to.
     * 
     * @returns Gain in tenths of a dB, 115 means 11.5 dB.
     */
    getTunerGain():number {
        this.checkOpen();
        // @ts-ignore
        let gain = librtlsdr.rtlsdr_get_tuner_gain(this.device);
        if(gain === 0) throw new Error("Unknown Error [device.getTunerGain]");

        return gain;
    }

    /**
     * Set the intermediate frequency gain for the device.
     * 
     * @param stage Intermediate frequency gain stage number (1 to 6 for E4000)
     * @param gain Measured in tenths of a dB, -30 means -3.0 dB.
     */
    setTunerIfGain(stage:number, gain:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_tuner_if_gain(this.device, stage, gain);
        if(result < 0) throw new Error("Unknown Error [device.setTunerIfGain]");
    }

    /**
     * Set the gain mode (automatic/manual) for the device.
     * Manual gain mode must be enabled for the gain setter function to work.
     * 
     * @param manual Gain mode, 1 means manual gain mode shall be enabled.
     */
    setTunerGainMode(manual:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_tuner_gain_mode(this.device, manual);
        if(result < 0) throw new Error("Unknown Error [device.setTunerGainMode]");
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
    setSampleRate(rate:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_sample_rate(this.device, rate);
        if(result !== 0) throw new Error("Unknown Error [device.setSampleRate]");
    }

    /**
     * Get actual sample rate the device is configured to.
     * 
     * @returns Sample rate in Hz
     */
    getSampleRate():number {
        this.checkOpen();
        // @ts-ignore
        let rate = librtlsdr.rtlsdr_get_sample_rate(this.device);
        if(rate === 0) throw new Error("Unknown Error [device.getSampleRate]");

        return rate;
    }

    /**
     * Enable test mode that returns an 8 bit counter instead of the samples.
     * The counter is generated inside the RTL2832.
     * 
     * @param on Test mode, 1 means enabled, 0 disabled
     */
    setTestmode(on:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_testmode(this.device, on);
        if(result !== 0) throw new Error("Unknown Error [device.setTestmode]");
    }

    /**
     * Enable or disable the internal digital AGC of the RTL2832.
     * 
     * @param on digital AGC mode, 1 means enabled, 0 disabled
     */
    setAGCMode(on:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_agc_mode(this.device, on);
        if(result !== 0) throw new Error("Unknown Error [device.setAGCMode]");
    }

    /**
     * Enable or disable the direct sampling mode. When enabled, the IF mode
     * of the RTL2832 is activated, and rtlsdr_set_center_freq() will control
     * the IF-frequency of the DDC, which can be used to tune from 0 to 28.8 MHz
     * (xtal frequency of the RTL2832).
     * 
     * @param on 0 means disabled, 1 I-ADC input enabled, 2 Q-ADC input enabled
     */
    setDirectSampling(on:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_direct_sampling(this.device, on);
        if(result !== 0) throw new Error("Unknown Error [device.setDirectSampling]");
    }

    /**
     * Get state of the direct sampling mode
     * 
     * @returns -1 on error, 0 means disabled, 1 I-ADC input enabled
     *	    2 Q-ADC input enabled
     */
    getDirectSampling():number {
        this.checkOpen();
        // @ts-ignore
        let ds = librtlsdr.rtlsdr_get_direct_sampling(this.device);
        if(ds === -1) throw new Error("Unknown Error [device.getDirectSampling]");

        return ds;
    }

    /**
     * Enable or disable offset tuning for zero-IF tuners, which allows to avoid
     * problems caused by the DC offset of the ADCs and 1/f noise.
     * 
     * @param on 0 means disabled, 1 enabled
     */
    setOffsetTuning(on:number) {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_offset_tuning(this.device, on);
        if(result !== 0) throw new Error("Unknown Error [device.setOffsetTuning]");
    }

    /**
     * Get state of the offset tuning mode
     * 
     * @returns -1 on error, 0 means disabled, 1 enabled
     */
    getOffsetTuning():number {
        this.checkOpen();
        // @ts-ignore
        let ot = librtlsdr.rtlsdr_get_offset_tuning(this.device);
        if(ot === 0) throw new Error("Unknown Error [device.getOffsetTuning]");

        return ot;
    }

    /**
     * Reset the device buffer
     */
    resetBuffer() {
        this.checkOpen();
        // @ts-ignore
        let result = librtlsdr.rtlsdr_reset_buffer(this.device);
        if(result !== 0) throw new Error("Unknown Error [device.resetBuffer]");
    }

    /**
     * read signal data from the device
     * 
     * @param len Amount of data to return
     * @returns Buffer with signal data
     */
    readSync(len:number):Buffer {
        this.checkOpen();
        this.resetBuffer();
        let buffer = Buffer.alloc(len).fill(0);
        let n = ref.alloc(ref.types.int);

        // @ts-ignore
        let result = librtlsdr.rtlsdr_read_sync(this.device, buffer, len, n);

        return buffer;
    }
    /*
    /**
     * Read samples from the device asynchronously. This function will block until
     * it is being canceled using rtlsdr_cancel_async()
     * 
     * @param callback Callback function to return received samples
     * @param buf_num optional buffer count, buf_num * buf_len = overall buffer size
     *		  set to 0 for default buffer count (15)
     * @param buf_len optional buffer length, must be multiple of 512,
     *		  should be a multiple of 16384 (URB size), set to 0
     *		  for default buffer length (16 * 32 * 512)
     *
    readAsync(callback:(buf:string, len:number, ctx:void)=>void, buf_num:number, buf_len:number) {
        this.checkOpen();
        let rtlsdrCallback = ffi.Callback("void", ["unsigned char*", "uint32", "void"], callback);
        // @ts-ignore
        librtlsdr.rtlsdr_read_async.async(this.device, rtlsdrCallback, ref.NULL, buf_num, buf_len, (err, value) => {
            if(err) throw err;
        });
    }*/

    /**
     * Cancels all pending async operations on the device.
     */
    cancelAsync():void {
        this.checkOpen();
        
        // @ts-ignore
        let result = librtlsdr.rtlsdr_cancel_async(this.device);
        if(result !== 0) throw new Error("Unknown Error [device.cancelAsync]")
    }
}