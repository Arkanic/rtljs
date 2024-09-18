declare class RTLSDRDevice {
    device: any;
    open: boolean;
    constructor(device: any);
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
export declare function getDeviceCount(): number;
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
export declare function getDeviceName(index: number): string | null;
/**
 * Device USB Strings interface
 */
export interface DeviceUSBStrings {
    /**
     * Manufacturer of device, can be NULL
     */
    manufacturer: string;
    /**
     * Product name, can be NULL
     */
    product: string;
    /**
     * Serial No, can be NULL
     */
    serial: string;
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
export declare function getDeviceUSBStrings(index: number): DeviceUSBStrings;
/**
 * Get device index by USB serial string descriptor.
 *
 * @param serial Serial string of the device
 *
 * @returns Device index of the first serial match
 */
export declare function getIndexBySerial(serial: string): number;
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
export declare function open(index: number): RTLSDRDevice;
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
export declare function close(device: RTLSDRDevice): void;
export {};
