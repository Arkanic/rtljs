import ffi from "ffi-napi";
import ref from "ref-napi";

import * as baremetal from "./baremetal";
import {librtlsdr} from "./baremetal";

export default class RTLSDRDevice {
    device:void;

    constructor(device:void) {
        this.device = device;
    }

    setXtalFreq(rtlFreq:number, tunerFreq:number) {
        // @ts-ignore
        let result = librtlsdr.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
    }
}