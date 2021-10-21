import ref from "ref-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";
import {DeviceUSBStrings, digestCharPtr} from "./rtlsdr-static";

export interface XtalFreq {
    rtlFreq:number;
    tunerFreq:number;
}

export default class RTLSDRDevice {
    device:void;

    constructor(device:void) {
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
    setXtalFreq(rtlFreq:number, tunerFreq:number) {
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
     */
    getXtalFreq():XtalFreq {
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
     * Get USB device strings. Max size 256 bytes.
     * 
     * @returns manufacturer, product, and serial strings. They may all be null.
     */
    getUSBStrings():DeviceUSBStrings {
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
     */
    setCenterFreq(freq:number) {
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_center_freq(this.device, freq);
        if(result < 0) throw new Error("Unknown Error [device.setCenterFreq]");
    }

    /**
     * Get actual frequency the device is tuned to.
     * 
     * @returns Frequency in Hz
     */
    getCenterFreq():number {
        // @ts-ignore
        let freq = librtlsdr.rtlsdr_get_center_freq(this.device);
        if(freq === 0) throw new Error("Unknown Error [device.getCenterFreq]");

        return freq;
    }

    /**
     * Set the frequency correction value for the device.
     * 
     * @param ppm Correction value in parts per million (ppm)
     */
    setFreqCorrection(ppm:number) {
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_freq_correction(this.device, ppm);
        if(result < 0) throw new Error("Unknown Error [device.setFreqCorrection]");
    }

    /**
     * Get actual frequency correction value of the device.
     * 
     * @returns Correction value in parts per million (ppm)
     */
    getFreqCorrection():number {
        // @ts-ignore
        let ppm = librtlsdr.rtlsdr_get_freq_correction(this.device);
        return ppm;
    }
}