export default class RTLSDRDevice {
    device: void;
    constructor(device: void);
    setXtalFreq(rtlFreq: number, tunerFreq: number): void;
}
