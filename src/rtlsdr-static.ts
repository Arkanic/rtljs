import ref from "ref-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";
import RTLSDRDevice from "./rtlsdr-device";

export function digestCharPtr(charPtr:Buffer):string|null {
    let terminatingNullPos = charPtr.indexOf("\u0000");
    if(terminatingNullPos > 0) {
        let rawString = charPtr.toString();
        return rawString.substr(0, terminatingNullPos);
    } else {
        return null;
    }
}

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
export function getDeviceCount():number {
    return librtlsdr.rtlsdr_get_device_count();
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
export function getDeviceName(index:number):string|null {
    return librtlsdr.rtlsdr_get_device_name(index);
}

/**
 * Device USB Strings interface
 */
export interface DeviceUSBStrings {
    /**
     * Manufacturer of device, can be NULL
     */
    manufacturer:string|null;
    /**
     * Product name, can be NULL
     */
    product:string|null;
    /**
     * Serial No, can be NULL
     */
    serial:string|null;
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
export function getDeviceUSBStrings(index:number):DeviceUSBStrings {
    let manufacturer = Buffer.alloc(256).fill(0);
    let product = Buffer.alloc(256).fill(0);
    let serial = Buffer.alloc(256).fill(0);

    // @ts-ignore
    let result = librtlsdr.rtlsdr_get_device_usb_strings(index, manufacturer, product, serial);
    if(result !== 0) throw new Error(`Unknown Error [getDeviceUSBStrings(${index})]`);
    return {
        manufacturer: digestCharPtr(manufacturer),
        product: digestCharPtr(product),
        serial: digestCharPtr(serial)
    }
}

/**
 * Get device index by USB serial string descriptor.
 * 
 * @param serial Serial string of the device
 * 
 * @returns Device index of the first serial match
 */
export function getIndexBySerial(serial:string):number {
    let result = librtlsdr.rtlsdr_get_index_by_serial(serial);
    if(result === -1) throw new Error(`Name is NULL for serial ${serial}`);
    else if(result === -2) throw new Error(`No devices were found at all for serial ${serial}`);
    else if(result === -3) throw new Error(`Devices were found, but none with matching name for serial ${serial}`);
    else if(result < 0) throw new Error(`Unkown Error [getIndexBySerial(${serial})]`);
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
export function open(index:number):RTLSDRDevice {
    let devicePtr = ref.alloc(baremetal.rtlsdr_devPtr);
    let result = librtlsdr.rtlsdr_open(devicePtr, index);
    if(result !== 0) throw new Error(`Unknown Error [open(${index})]`);

    return new RTLSDRDevice(devicePtr.deref());
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
export function close(device:RTLSDRDevice) {
    // @ts-ignore
    let result = librtlsdr.rtlsdr_close(device.device);
    if(result !== 0) throw new Error("Unknown Error [close]");

    device.open = false;
}