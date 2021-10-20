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
export declare function getDeviceUSBStrings(index: number): DeviceUSBStrings;
