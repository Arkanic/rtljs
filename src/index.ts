import {getDeviceCount, getDeviceName, getDeviceUSBStrings, getIndexBySerial, open, close, DeviceUSBStrings} from "./rtlsdr-static";
import {rtlsdr_tunerEnum} from "./baremetal";
import * as baremetal from "./baremetal";
import RTLSDRDevice, {XtalFreq} from "./rtlsdr-device";

const ghz = 1000000000;
const mhz = 1000000;
const khz = 1000;

export {
    getDeviceCount,
    getDeviceName,
    getDeviceUSBStrings,
    getIndexBySerial,
    open,
    close,

    ghz,
    mhz,
    khz,

    rtlsdr_tunerEnum,
    RTLSDRDevice,
    DeviceUSBStrings,
    XtalFreq,

    baremetal
};