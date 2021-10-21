import ref from "ref-napi";
import { DeviceUSBStrings } from "./rtlsdr-static";
export interface XtalFreq {
    rtlFreq: number;
    tunerFreq: number;
}
export default class RTLSDRDevice {
    device: void;
    constructor(device: void);
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
    setXtalFreq(rtlFreq: number, tunerFreq: number): void;
    /**
     * Get crystal oscillator frequencies used for the RTL2832 and the tuner IC.
     *
     * Usually both ICs use the same clock.
     *
     * @returns Frequency value used to clock the RTL2832 and IC, in Hz
     */
    getXtalFreq(): XtalFreq;
    /**
     * Get USB device strings. Max size 256 bytes.
     *
     * @returns manufacturer, product, and serial strings. They may all be null.
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
     */
    setCenterFreq(freq: number): void;
    /**
     * Get actual frequency the device is tuned to.
     *
     * @returns Frequency in Hz
     */
    getCenterFreq(): number;
    /**
     * Set the frequency correction value for the device.
     *
     * @param ppm Correction value in parts per million (ppm)
     */
    setFreqCorrection(ppm: number): void;
    /**
     * Get actual frequency correction value of the device.
     *
     * @returns Correction value in parts per million (ppm)
     */
    getFreqCorrection(): number;
}
