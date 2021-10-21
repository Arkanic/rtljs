/// <reference types="node" />
/// <reference types="ref-napi" />
import RTLSDRDevice from "./rtlsdr-device";
export declare function digestCharPtr(charPtr: Buffer): string | null;
/**
 * Get the number of available devices
 *
 * @returns Current device count
 */
export declare function getDeviceCount(): number;
/**
 * Get the device name of the specified index
 *
 * @param index Index of device to be named
 *
 * @returns The name of the device. Max length 256 bytes. May be null.
 */
export declare function getDeviceName(index: number): string | null;
export interface DeviceUSBStrings {
    manufacturer: string | null;
    product: string | null;
    serial: string | null;
}
/**
 * Get USB device strings. Maximum length is 256 bytes.
 *
 * @param index the device index
 *
 * @returns manufacturer, serial, and product name, may be null
 */
export declare function getDeviceUSBStrings(index: number): DeviceUSBStrings;
/**
 * Get device index by USB serial string descriptor.
 *
 * @param serial Serial string of the device
 * @returns Device index of the first serial match
 */
export declare function getIndexBySerial(serial: string): number;
/**
 * Open RTLSDR device by index
 *
 * @param index Device index
 * @returns Device instance
 */
export declare function open(index: number): RTLSDRDevice;
export declare function close(device: RTLSDRDevice): void;
