import ref from "ref-napi";
export default class RTLSDRDevice {
    device: ref.Pointer<void>;
    constructor(device: ref.Pointer<void>);
    setXtalFreq(rtlFreq: number, tunerFreq: number): void;
}
