import ffi from "ffi-napi";
import ref from "ref-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";


function digestCharPtr(charPtr:Buffer):string|null {
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
 */
export function getDeviceName(index:number):string|null {
    return librtlsdr.rtlsdr_get_device_name(index);
}

export interface DeviceUSBStrings {
    manufacturer:string|null;
    product:string|null;
    serial:string|null;
}

export function getDeviceUSBStrings(index:number):DeviceUSBStrings {
    let manufacturer = Buffer.alloc(256).fill(0);
    let product = Buffer.alloc(256).fill(0);
    let serial = Buffer.alloc(256).fill(0);

    // @ts-ignore
    let result = librtlsdr.rtlsdr_get_device_usb_strings(index, manufacturer, product, serial);
    if(result !== 0) throw new Error(`Failed to open device #${index}: ${result}`);
    return {
        manufacturer: digestCharPtr(manufacturer),
        product: digestCharPtr(product),
        serial: digestCharPtr(serial)
    }
}