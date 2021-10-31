/// <reference types="node" />
import ref from "ref-napi";
import { DeviceUSBStrings } from "./rtlsdr-static";
/**
 * Contains rtl and tuner crystal oscillating frequency
 */
export interface XtalFreq {
    /**
     * RTL crystal oscillating frequency
     */
    rtlFreq: number;
    /**
     * Tuner crysta oscillating frequency
     */
    tunerFreq: number;
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
    device: void;
    open: boolean;
    constructor(device: void);
    private checkOpen;
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
    setXtalFreq(rtlFreq: number, tunerFreq: number): void;
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
    getXtalFreq(): XtalFreq;
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
    getUSBStrings(): DeviceUSBStrings;
    /**
     * Write the device EEPROM
     *
     * @param data Buffer of data to be written
     * @param offset Address where the data should be written
     * @param len Length of the data
     */
    writeEEPROM(data: ref.Pointer<number>, offset: number, len: number): void;
    /**
     * Read the device EEPROM
     *
     * @param offset Address where the data should be read from
     * @param len Length of the data
     *
     */
    readEEPROM(offset: number, len: number): number;
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
    setCenterFreq(freq: number): void;
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
    getCenterFreq(): number;
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
    setFreqCorrection(ppm: number): void;
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
    getFreqCorrection(): number;
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
    getTunerType(): string;
    /**
     * Get a list of gains supported by the tuner.
     *
     * NOTE: The gains argument must be preallocated by the caller. If NULL is
     * being given instead, the number of available gain values will be returned.
     *
     * @param gains Array of gain values. In tenths of a dB, 115 means 11.5 dB.
     * @returns Number of available (returned) gain values otherwise
     */
    getTunerGains(gains: Array<number> | null): number;
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
    setTunerGain(gain: number): void;
    /**
     * Set the bandwidth for the device.
     *
     * @param bw Bandwidth in Hz. Zero means automatic BW selection.
     */
    setTunerBandwidth(bw: number): void;
    /**
     * Get actual gain the device is configured to.
     *
     * @returns Gain in tenths of a dB, 115 means 11.5 dB.
     */
    getTunerGain(): number;
    /**
     * Set the intermediate frequency gain for the device.
     *
     * @param stage Intermediate frequency gain stage number (1 to 6 for E4000)
     * @param gain Measured in tenths of a dB, -30 means -3.0 dB.
     */
    setTunerIfGain(stage: number, gain: number): void;
    /**
     * Set the gain mode (automatic/manual) for the device.
     * Manual gain mode must be enabled for the gain setter function to work.
     *
     * @param manual Gain mode, 1 means manual gain mode shall be enabled.
     */
    setTunerGainMode(manual: number): void;
    /**
     * Set the sample rate for the device, also selects the baseband filters
     * according to the requested sample rate for tuners where this is possible.
     *
     * @param rate samp_rate the sample rate to be set, possible values are:
     * 		    225001 - 300000 Hz
     * 		    900001 - 3200000 Hz
     * 		    sample loss is to be expected for rates > 2400000
     */
    setSampleRate(rate: number): void;
    /**
     * Get actual sample rate the device is configured to.
     *
     * @returns Sample rate in Hz
     */
    getSampleRate(): number;
    /**
     * Enable test mode that returns an 8 bit counter instead of the samples.
     * The counter is generated inside the RTL2832.
     *
     * @param on Test mode, 1 means enabled, 0 disabled
     */
    setTestmode(on: number): void;
    /**
     * Enable or disable the internal digital AGC of the RTL2832.
     *
     * @param on digital AGC mode, 1 means enabled, 0 disabled
     */
    setAGCMode(on: number): void;
    /**
     * Enable or disable the direct sampling mode. When enabled, the IF mode
     * of the RTL2832 is activated, and rtlsdr_set_center_freq() will control
     * the IF-frequency of the DDC, which can be used to tune from 0 to 28.8 MHz
     * (xtal frequency of the RTL2832).
     *
     * @param on 0 means disabled, 1 I-ADC input enabled, 2 Q-ADC input enabled
     */
    setDirectSampling(on: number): void;
    /**
     * Get state of the direct sampling mode
     *
     * @returns -1 on error, 0 means disabled, 1 I-ADC input enabled
     *	    2 Q-ADC input enabled
     */
    getDirectSampling(): number;
    /**
     * Enable or disable offset tuning for zero-IF tuners, which allows to avoid
     * problems caused by the DC offset of the ADCs and 1/f noise.
     *
     * @param on 0 means disabled, 1 enabled
     */
    setOffsetTuning(on: number): void;
    /**
     * Get state of the offset tuning mode
     *
     * @returns -1 on error, 0 means disabled, 1 enabled
     */
    getOffsetTuning(): number;
    /**
     * Reset the device buffer
     */
    resetBuffer(): void;
    readSync(len: number): Buffer;
}
