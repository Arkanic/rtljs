import ffi from "ffi-napi";
import ref from "ref-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";

export default class RTLSDRDevice {
    device:ref.Pointer<void>;

    constructor(device:ref.Pointer<void>) {
        this.device = device;
    }

    setXtalFreq(rtlFreq:number, tunerFreq:number) {
        let result = librtlsdr.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
    }
}