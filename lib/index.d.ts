import { getDeviceCount, getDeviceName, getDeviceUSBStrings, getIndexBySerial, open, close, DeviceUSBStrings } from "./rtlsdr-static";
import { rtlsdr_tunerEnum } from "./baremetal";
import RTLSDRDevice, { XtalFreq } from "./rtlsdr-device";
declare const ghz = 1000000000;
declare const mhz = 1000000;
declare const khz = 1000;
export { getDeviceCount, getDeviceName, getDeviceUSBStrings, getIndexBySerial, open, close, ghz, mhz, khz, rtlsdr_tunerEnum, RTLSDRDevice, DeviceUSBStrings, XtalFreq, };
