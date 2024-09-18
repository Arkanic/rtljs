import koffi from "koffi";

export const lib = koffi.load("librtlsdr.so.0");

export const rtlsdr_dev_tPtr = koffi.inout(koffi.pointer(koffi.opaque("rtlsdr_dev_t")));
export const rtlsdr_dev_tPtrPtr = koffi.inout(koffi.pointer(rtlsdr_dev_tPtr));

export const rtlsdr_tunerEnum = [
    "RTLSDR_TUNER_UNKNOWN",
    "RTLSDR_TUNER_E4000",
    "RTLSDR_TUNER_FC0012",
    "RTLSDR_TUNER_FC0013",
    "RTLSDR_TUNER_FC2580",
    "RTLSDR_TUNER_R820T",
    "RTLSDR_TUNER_R828D"
];
export const rtlsdr_tunerPtr = koffi.pointer(koffi.opaque("rtlsdr_tuner"));

export const rtlsdr_ds_modeEnum = [
    "RTLSDR_DS_IQ",
    "RTLSDR_DS_I",
    "RTLSDR_DS_Q",
    "RTLSDR_DS_I_BELOW",
    "RTLSDR_DS_Q_BELOW"
];
export const rtlsdr_ds_modePtr = koffi.pointer(koffi.opaque("rtlsdr_ds_mode"));


export const rtlsdr_get_device_count = lib.func("uint32_t rtlsdr_get_device_count()");
export const rtlsdr_get_device_name = lib.func("const char *rtlsdr_get_device_name(uint32_t index)");
export const rtlsdr_get_device_usb_strings = lib.func("int rtlsdr_get_device_usb_strings(uint32_t index, _Out_ char *manufact, _Out_ char *product, _Out_ char *serial)");
export const rtlsdr_get_index_by_serial = lib.func("int rtlsdr_get_index_by_serial(const char *serial)");
export const rtlsdr_open = lib.func("rtlsdr_open", "int", [koffi.inout(rtlsdr_dev_tPtrPtr), "uint32_t"]);
export const rtlsdr_close = lib.func("rtlsdr_close", "int", [koffi.inout(rtlsdr_dev_tPtr)]);
export const rtlsdr_set_xtal_freq = lib.func("rtlsdr_set_xtal_freq", "int", [rtlsdr_dev_tPtr, "uint32_t", "uint32_t"]);
export const rtlsdr_get_xtal_freq = lib.func("rtlsdr_get_xtal_freq", "int", [rtlsdr_dev_tPtr, koffi.inout("uint32_t *"), koffi.inout("uint32_t *")]);
export const rtlsdr_get_usb_strings = lib.func("rtlsdr_get_usb_strings", "int", [rtlsdr_dev_tPtr, koffi.out("char *"), koffi.out("char *"), koffi.out("char *")]);
export const rtlsdr_write_eeprom = lib.func("rtlsdr_write_eeprom", "int", [rtlsdr_dev_tPtr, "uint8_t *", "uint8_t", "uint16_t"]);
export const rtlsdr_read_eeprom = lib.func("rtlsdr_read_eeprom", "int", [rtlsdr_dev_tPtr, koffi.out("uint8_t *"), "uint8_t", "uint16_t"]);
export const rtlsdr_set_center_freq = lib.func("rtlsdr_set_center_freq", "int", [rtlsdr_dev_tPtr, "uint32_t"]);
export const rtlsdr_get_center_freq = lib.func("rtlsdr_get_center_freq", "uint32_t", [koffi.inout(rtlsdr_dev_tPtr)]);
//export const rtlsdr_set_harmonic_rx = lib.func("rtlsdr_set_harmonic_rx", "int", [rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_is_tuner_PLL_locked = lib.func("rtlsdr_is_tuner_PLL_locked", "int", [rtlsdr_dev_tPtr]);
//export const rtlsdr_set_center_freq64 = lib.func("rtlsdr_set_center_freq64", "int", [rtlsdr_dev_tPtr, "uint64_t"]);
//export const rtlsdr_get_center_freq64 = lib.func("rtlsdr_get_center_freq64", "uint64_t", [rtlsdr_dev_tPtr]);
export const rtlsdr_set_freq_correction = lib.func("rtlsdr_set_freq_correction", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_get_freq_correction = lib.func("rtlsdr_get_freq_correction", "int", [rtlsdr_dev_tPtr]);
export const rtlsdr_get_tuner_type = lib.func("rtlsdr_get_tuner_type", "int", [rtlsdr_dev_tPtr]);
export const rtlsdr_get_tuner_gains = lib.func("rtlsdr_get_tuner_gains", "int", [rtlsdr_dev_tPtr, koffi.inout("int *")]);
export const rtlsdr_set_tuner_gain = lib.func("rtlsdr_set_tuner_gain", "int", [rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_set_and_get_tuner_bandwidth = lib.func("rtlsdr_set_and_get_tuner_bandwidth", "int", [rtlsdr_dev_tPtr, "uint32_t", koffi.inout("uint32_t *"), "int"]);
export const rtlsdr_set_tuner_bandwidth = lib.func("rtlsdr_set_tuner_bandwidth", "int", [rtlsdr_dev_tPtr, "uint32_t"]);
//export const rtlsdr_set_tuner_band_center = lib.func("rtlsdr_set_tuner_band_center", "int", [rtlsdr_dev_tPtr, "int32_t"]);
//export const rtlsdr_set_tuner_sideband = lib.func("rtlsdr_set_tuner_sideband", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_get_tuner_gain = lib.func("rtlsdr_get_tuner_gain", "int", [rtlsdr_dev_tPtr]);
//export const rtlsdr_set_tuner_gain_ext = lib.func("rtlsdr_set_tuner_gain_ext", "int", [rtlsdr_dev_tPtr, "int", "int", "int"]);
export const rtlsdr_set_tuner_if_gain = lib.func("rtlsdr_set_tuner_if_gain", "int", [rtlsdr_dev_tPtr, "int", "int"]);
export const rtlsdr_set_tuner_gain_mode = lib.func("rtlsdr_set_tuner_gain_mode", "int", [rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_set_tuner_if_mode = lib.func("rtlsdr_set_tuner_if_mode", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_set_sample_rate = lib.func("rtlsdr_set_sample_rate", "int", [rtlsdr_dev_tPtr, "uint32_t"]);
export const rtlsdr_get_sample_rate = lib.func("rtlsdr_get_sample_rate", "uint32_t", [rtlsdr_dev_tPtr]);
export const rtlsdr_set_testmode = lib.func("rtlsdr_set_testmode", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_set_agc_mode = lib.func("rtlsdr_set_agc_mode", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_set_direct_sampling = lib.func("rtlsdr_set_direct_sampling", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_get_direct_sampling = lib.func("rtlsdr_get_direct_sampling", "int", [rtlsdr_dev_tPtr]);
//export const rtlsdr_set_ds_mode = lib.func("rtlsdr_set_ds_mode", "int", [rtlsdr_dev_tPtr, "int", "uint32_t"]);
export const rtlsdr_set_offset_tuning = lib.func("rtlsdr_set_offset_tuning", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_get_offset_tuning = lib.func("rtlsdr_get_offset_tuning", "int", [rtlsdr_dev_tPtr]);
//export const rtlsdr_set_dithering = lib.func("rtlsdr_set_dithering", "int", [rtlsdr_dev_tPtr, "int"]);
export const rtlsdr_reset_buffer = lib.func("rtlsdr_reset_buffer", "int", [rtlsdr_dev_tPtr]);
export const rtlsdr_read_sync = lib.func("rtlsdr_read_sync", "int", [rtlsdr_dev_tPtr, koffi.inout("uint8_t *"), "int", koffi.inout("int *")]);
export const rtlsdr_read_async_cb_t = koffi.proto("void rtlsdr_read_async_cb_t(unsigned char *buf, uint32_t len, void *ctx)");
// rtlsdr_wait_async will not be implemented as it is deprecated, subject for removal.
export const rtlsdr_read_async = lib.func("rtlsdr_read_async", "int", [rtlsdr_dev_tPtr, koffi.pointer(rtlsdr_read_async_cb_t), koffi.inout("void *"), "uint32_t", "uint32_t"]);
export const rtlsdr_cancel_async = lib.func("rtlsdr_cancel_async", "int", [rtlsdr_dev_tPtr]);