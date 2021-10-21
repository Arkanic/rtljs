"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baremetal_1 = require("./baremetal");
var RTLSDRDevice = /** @class */ (function () {
    function RTLSDRDevice(device) {
        this.device = device;
    }
    RTLSDRDevice.prototype.setXtalFreq = function (rtlFreq, tunerFreq) {
        // @ts-ignore
        var result = baremetal_1.librtlsdr.rtlsdr_set_xtal_freq(this.device, rtlFreq, tunerFreq);
    };
    return RTLSDRDevice;
}());
exports.default = RTLSDRDevice;
