"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.librtlsdr = exports.voidPtr = exports.intPtr = exports.charPtr = exports.uint32Ptr = exports.uint8Ptr = exports.rtlsdr_tuner = exports.rtlsdr_tunerEnum = exports.rtlsdr_devPtr = exports.rtlsdr_dev = void 0;
var ffi_napi_1 = __importDefault(require("ffi-napi"));
var ref_napi_1 = __importDefault(require("ref-napi"));
exports.rtlsdr_dev = ref_napi_1.default.types.void;
exports.rtlsdr_devPtr = ref_napi_1.default.refType(exports.rtlsdr_dev);
exports.rtlsdr_tunerEnum = [
    "RTLSDR_TUNER_UNKNOWN",
    "RTLSDR_TUNER_E4000",
    "RTLSDR_TUNER_FC0012",
    "RTLSDR_TUNER_FC0013",
    "RTLSDR_TUNER_FC2580",
    "RTLSDR_TUNER_R820T",
    "RTLSDR_TUNER_R828D"
];
exports.rtlsdr_tuner = ref_napi_1.default.types.void;
exports.uint8Ptr = ref_napi_1.default.refType(ref_napi_1.default.types.uint8);
exports.uint32Ptr = ref_napi_1.default.refType(ref_napi_1.default.types.uint32);
exports.charPtr = ref_napi_1.default.refType(ref_napi_1.default.types.char);
exports.intPtr = ref_napi_1.default.refType(ref_napi_1.default.types.int);
exports.voidPtr = ref_napi_1.default.refType(ref_napi_1.default.types.void);
exports.librtlsdr = ffi_napi_1.default.Library("librtlsdr", {
    "rtlsdr_get_device_count": ["uint32", []],
    "rtlsdr_get_device_name": ["string", ["uint32"]],
    "rtlsdr_get_device_usb_strings": ["int", ["uint32", "char *", "char *", "char *"]],
    "rtlsdr_get_index_by_serial": ["int", ["string"]],
    "rtlsdr_open": ["int", [exports.rtlsdr_devPtr, "uint32"]],
    "rtlsdr_close": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_xtal_freq": ["int", [exports.rtlsdr_devPtr, "uint32", "uint32"]],
    "rtlsdr_get_xtal_freq": ["int", [exports.rtlsdr_devPtr, exports.uint32Ptr, exports.uint32Ptr]],
    "rtlsdr_get_usb_strings": ["int", [exports.rtlsdr_devPtr, exports.charPtr, exports.charPtr, exports.charPtr]],
    "rtlsdr_write_eeprom": ["int", [exports.rtlsdr_devPtr, exports.uint8Ptr, "uint8", "uint16"]],
    "rtlsdr_read_eeprom": ["int", [exports.rtlsdr_devPtr, exports.uint8Ptr, "uint8", "uint16"]],
    "rtlsdr_set_center_freq": ["int", [exports.rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_center_freq": ["uint32", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_freq_correction": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_get_freq_correction": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_get_tuner_type": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_get_tuner_gains": ["int", [exports.rtlsdr_devPtr, exports.intPtr]],
    "rtlsdr_set_tuner_gain": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_set_tuner_bandwidth": ["int", [exports.rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_tuner_gain": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_tuner_if_gain": ["int", [exports.rtlsdr_devPtr, "int", "int"]],
    "rtlsdr_set_tuner_gain_mode": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_set_sample_rate": ["int", [exports.rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_sample_rate": ["uint32", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_testmode": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_set_agc_mode": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_set_direct_sampling": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_get_direct_sampling": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_offset_tuning": ["int", [exports.rtlsdr_devPtr, "int"]],
    "rtlsdr_get_offset_tuning": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_reset_buffer": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_read_sync": ["int", [exports.rtlsdr_devPtr, exports.voidPtr, "int", exports.intPtr]],
    "rtlsdr_read_async": ["int", [exports.rtlsdr_devPtr, "void", "void *", "uint32", "uint32"]],
    "rtlsdr_cancel_async": ["int", [exports.rtlsdr_devPtr]],
    "rtlsdr_set_bias_tee": ["int", [exports.rtlsdr_devPtr, "int"]]
});
