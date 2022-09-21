import ffi from "ffi-napi";
import ref from "ref-napi";

export const rtlsdr_dev = ref.types.void;
export const rtlsdr_devPtr = ref.refType(rtlsdr_dev);
export const rtlsdr_tunerEnum = [
    "RTLSDR_TUNER_UNKNOWN",
    "RTLSDR_TUNER_E4000",
    "RTLSDR_TUNER_FC0012",
    "RTLSDR_TUNER_FC0013",
    "RTLSDR_TUNER_FC2580",
    "RTLSDR_TUNER_R820T",
    "RTLSDR_TUNER_R828D"
];
export const rtlsdr_tuner = ref.types.void;

export const uint8Ptr = ref.refType(ref.types.uint8);
export const uint32Ptr = ref.refType(ref.types.uint32);
export const charPtr = ref.refType(ref.types.char);
export const intPtr = ref.refType(ref.types.int);
export const voidPtr = ref.refType(ref.types.void);

export const librtlsdr = ffi.Library("librtlsdr", {
    "rtlsdr_get_device_count": ["uint32", []],
    "rtlsdr_get_device_name": ["string", ["uint32"]],
    "rtlsdr_get_device_usb_strings": ["int", ["uint32", "char *", "char *", "char *"]],
    "rtlsdr_get_index_by_serial": ["int", ["string"]],
    "rtlsdr_open": ["int", [rtlsdr_devPtr, "uint32"]],
    "rtlsdr_close": ["int", [rtlsdr_devPtr]],
    "rtlsdr_set_xtal_freq": ["int", [rtlsdr_devPtr, "uint32", "uint32"]],
    "rtlsdr_get_xtal_freq": ["int", [rtlsdr_devPtr, uint32Ptr, uint32Ptr]],
    "rtlsdr_get_usb_strings": ["int", [rtlsdr_devPtr, charPtr, charPtr, charPtr]],
    "rtlsdr_write_eeprom": ["int", [rtlsdr_devPtr, uint8Ptr, "uint8", "uint16"]],
    "rtlsdr_read_eeprom": ["int", [rtlsdr_devPtr, uint8Ptr, "uint8", "uint16"]],
    "rtlsdr_set_center_freq": ["int", [rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_center_freq": ["uint32", [rtlsdr_devPtr]],
    "rtlsdr_set_freq_correction": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_get_freq_correction": ["int", [rtlsdr_devPtr]],
    "rtlsdr_get_tuner_type": ["int", [rtlsdr_devPtr]],
    "rtlsdr_get_tuner_gains": ["int", [rtlsdr_devPtr, intPtr]],
    "rtlsdr_set_tuner_gain": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_set_tuner_bandwidth": ["int", [rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_tuner_gain": ["int", [rtlsdr_devPtr]],
    "rtlsdr_set_tuner_if_gain": ["int", [rtlsdr_devPtr, "int", "int"]],
    "rtlsdr_set_tuner_gain_mode": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_set_sample_rate": ["int", [rtlsdr_devPtr, "uint32"]],
    "rtlsdr_get_sample_rate": ["uint32", [rtlsdr_devPtr]],
    "rtlsdr_set_testmode": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_set_agc_mode": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_set_direct_sampling": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_get_direct_sampling": ["int", [rtlsdr_devPtr]],
    "rtlsdr_set_offset_tuning": ["int", [rtlsdr_devPtr, "int"]],
    "rtlsdr_get_offset_tuning": ["int", [rtlsdr_devPtr]],
    "rtlsdr_reset_buffer": ["int", [rtlsdr_devPtr]],
    "rtlsdr_read_sync": ["int", [rtlsdr_devPtr, voidPtr, "int", intPtr]],
    "rtlsdr_read_async": ["int", [rtlsdr_devPtr, "void", "void *", "uint32", "uint32"]],
    "rtlsdr_cancel_async": ["int", [rtlsdr_devPtr]],
    "rtlsdr_set_bias_tee": ["int", [rtlsdr_devPtr, "int"]]
});
