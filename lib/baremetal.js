"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtlsdr_cancel_async = exports.rtlsdr_read_async = exports.rtlsdr_read_async_cb_t = exports.rtlsdr_read_sync = exports.rtlsdr_reset_buffer = exports.rtlsdr_get_offset_tuning = exports.rtlsdr_set_offset_tuning = exports.rtlsdr_get_direct_sampling = exports.rtlsdr_set_direct_sampling = exports.rtlsdr_set_agc_mode = exports.rtlsdr_set_testmode = exports.rtlsdr_get_sample_rate = exports.rtlsdr_set_sample_rate = exports.rtlsdr_set_tuner_gain_mode = exports.rtlsdr_set_tuner_if_gain = exports.rtlsdr_get_tuner_gain = exports.rtlsdr_set_tuner_bandwidth = exports.rtlsdr_set_tuner_gain = exports.rtlsdr_get_tuner_gains = exports.rtlsdr_get_tuner_type = exports.rtlsdr_get_freq_correction = exports.rtlsdr_set_freq_correction = exports.rtlsdr_get_center_freq = exports.rtlsdr_set_center_freq = exports.rtlsdr_read_eeprom = exports.rtlsdr_write_eeprom = exports.rtlsdr_get_usb_strings = exports.rtlsdr_get_xtal_freq = exports.rtlsdr_set_xtal_freq = exports.rtlsdr_close = exports.rtlsdr_open = exports.rtlsdr_get_index_by_serial = exports.rtlsdr_get_device_usb_strings = exports.rtlsdr_get_device_name = exports.rtlsdr_get_device_count = exports.rtlsdr_ds_modePtr = exports.rtlsdr_ds_modeEnum = exports.rtlsdr_tunerPtr = exports.rtlsdr_tunerEnum = exports.rtlsdr_dev_tPtrPtr = exports.rtlsdr_dev_tPtr = exports.lib = void 0;
const koffi_1 = __importDefault(require("koffi"));
exports.lib = koffi_1.default.load("librtlsdr.so.0");
exports.rtlsdr_dev_tPtr = koffi_1.default.inout(koffi_1.default.pointer(koffi_1.default.opaque("rtlsdr_dev_t")));
exports.rtlsdr_dev_tPtrPtr = koffi_1.default.inout(koffi_1.default.pointer(exports.rtlsdr_dev_tPtr));
exports.rtlsdr_tunerEnum = [
    "RTLSDR_TUNER_UNKNOWN",
    "RTLSDR_TUNER_E4000",
    "RTLSDR_TUNER_FC0012",
    "RTLSDR_TUNER_FC0013",
    "RTLSDR_TUNER_FC2580",
    "RTLSDR_TUNER_R820T",
    "RTLSDR_TUNER_R828D"
];
exports.rtlsdr_tunerPtr = koffi_1.default.pointer(koffi_1.default.opaque("rtlsdr_tuner"));
exports.rtlsdr_ds_modeEnum = [
    "RTLSDR_DS_IQ",
    "RTLSDR_DS_I",
    "RTLSDR_DS_Q",
    "RTLSDR_DS_I_BELOW",
    "RTLSDR_DS_Q_BELOW"
];
exports.rtlsdr_ds_modePtr = koffi_1.default.pointer(koffi_1.default.opaque("rtlsdr_ds_mode"));
exports.rtlsdr_get_device_count = exports.lib.func("uint32_t rtlsdr_get_device_count()");
exports.rtlsdr_get_device_name = exports.lib.func("const char *rtlsdr_get_device_name(uint32_t index)");
exports.rtlsdr_get_device_usb_strings = exports.lib.func("int rtlsdr_get_device_usb_strings(uint32_t index, _Out_ char *manufact, _Out_ char *product, _Out_ char *serial)");
exports.rtlsdr_get_index_by_serial = exports.lib.func("int rtlsdr_get_index_by_serial(const char *serial)");
exports.rtlsdr_open = exports.lib.func("rtlsdr_open", "int", [koffi_1.default.inout(exports.rtlsdr_dev_tPtrPtr), "uint32_t"]);
exports.rtlsdr_close = exports.lib.func("rtlsdr_close", "int", [koffi_1.default.inout(exports.rtlsdr_dev_tPtr)]);
exports.rtlsdr_set_xtal_freq = exports.lib.func("rtlsdr_set_xtal_freq", "int", [exports.rtlsdr_dev_tPtr, "uint32_t", "uint32_t"]);
exports.rtlsdr_get_xtal_freq = exports.lib.func("rtlsdr_get_xtal_freq", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.inout("uint32_t *"), koffi_1.default.inout("uint32_t *")]);
exports.rtlsdr_get_usb_strings = exports.lib.func("rtlsdr_get_usb_strings", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.out("char *"), koffi_1.default.out("char *"), koffi_1.default.out("char *")]);
exports.rtlsdr_write_eeprom = exports.lib.func("rtlsdr_write_eeprom", "int", [exports.rtlsdr_dev_tPtr, "uint8_t *", "uint8_t", "uint16_t"]);
exports.rtlsdr_read_eeprom = exports.lib.func("rtlsdr_read_eeprom", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.out("uint8_t *"), "uint8_t", "uint16_t"]);
exports.rtlsdr_set_center_freq = exports.lib.func("rtlsdr_set_center_freq", "int", [exports.rtlsdr_dev_tPtr, "uint32_t"]);
exports.rtlsdr_get_center_freq = exports.lib.func("rtlsdr_get_center_freq", "uint32_t", [koffi_1.default.inout(exports.rtlsdr_dev_tPtr)]);
//export const rtlsdr_set_harmonic_rx = lib.func("rtlsdr_set_harmonic_rx", "int", [rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_is_tuner_PLL_locked = lib.func("rtlsdr_is_tuner_PLL_locked", "int", [rtlsdr_dev_tPtr]);
//export const rtlsdr_set_center_freq64 = lib.func("rtlsdr_set_center_freq64", "int", [rtlsdr_dev_tPtr, "uint64_t"]);
//export const rtlsdr_get_center_freq64 = lib.func("rtlsdr_get_center_freq64", "uint64_t", [rtlsdr_dev_tPtr]);
exports.rtlsdr_set_freq_correction = exports.lib.func("rtlsdr_set_freq_correction", "int", [exports.rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_get_freq_correction = exports.lib.func("rtlsdr_get_freq_correction", "int", [exports.rtlsdr_dev_tPtr]);
exports.rtlsdr_get_tuner_type = exports.lib.func("rtlsdr_get_tuner_type", "int", [exports.rtlsdr_dev_tPtr]);
exports.rtlsdr_get_tuner_gains = exports.lib.func("rtlsdr_get_tuner_gains", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.inout("int *")]);
exports.rtlsdr_set_tuner_gain = exports.lib.func("rtlsdr_set_tuner_gain", "int", [exports.rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_set_and_get_tuner_bandwidth = lib.func("rtlsdr_set_and_get_tuner_bandwidth", "int", [rtlsdr_dev_tPtr, "uint32_t", koffi.inout("uint32_t *"), "int"]);
exports.rtlsdr_set_tuner_bandwidth = exports.lib.func("rtlsdr_set_tuner_bandwidth", "int", [exports.rtlsdr_dev_tPtr, "uint32_t"]);
//export const rtlsdr_set_tuner_band_center = lib.func("rtlsdr_set_tuner_band_center", "int", [rtlsdr_dev_tPtr, "int32_t"]);
//export const rtlsdr_set_tuner_sideband = lib.func("rtlsdr_set_tuner_sideband", "int", [rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_get_tuner_gain = exports.lib.func("rtlsdr_get_tuner_gain", "int", [exports.rtlsdr_dev_tPtr]);
//export const rtlsdr_set_tuner_gain_ext = lib.func("rtlsdr_set_tuner_gain_ext", "int", [rtlsdr_dev_tPtr, "int", "int", "int"]);
exports.rtlsdr_set_tuner_if_gain = exports.lib.func("rtlsdr_set_tuner_if_gain", "int", [exports.rtlsdr_dev_tPtr, "int", "int"]);
exports.rtlsdr_set_tuner_gain_mode = exports.lib.func("rtlsdr_set_tuner_gain_mode", "int", [exports.rtlsdr_dev_tPtr, "int"]);
//export const rtlsdr_set_tuner_if_mode = lib.func("rtlsdr_set_tuner_if_mode", "int", [rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_set_sample_rate = exports.lib.func("rtlsdr_set_sample_rate", "int", [exports.rtlsdr_dev_tPtr, "uint32_t"]);
exports.rtlsdr_get_sample_rate = exports.lib.func("rtlsdr_get_sample_rate", "uint32_t", [exports.rtlsdr_dev_tPtr]);
exports.rtlsdr_set_testmode = exports.lib.func("rtlsdr_set_testmode", "int", [exports.rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_set_agc_mode = exports.lib.func("rtlsdr_set_agc_mode", "int", [exports.rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_set_direct_sampling = exports.lib.func("rtlsdr_set_direct_sampling", "int", [exports.rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_get_direct_sampling = exports.lib.func("rtlsdr_get_direct_sampling", "int", [exports.rtlsdr_dev_tPtr]);
//export const rtlsdr_set_ds_mode = lib.func("rtlsdr_set_ds_mode", "int", [rtlsdr_dev_tPtr, "int", "uint32_t"]);
exports.rtlsdr_set_offset_tuning = exports.lib.func("rtlsdr_set_offset_tuning", "int", [exports.rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_get_offset_tuning = exports.lib.func("rtlsdr_get_offset_tuning", "int", [exports.rtlsdr_dev_tPtr]);
//export const rtlsdr_set_dithering = lib.func("rtlsdr_set_dithering", "int", [rtlsdr_dev_tPtr, "int"]);
exports.rtlsdr_reset_buffer = exports.lib.func("rtlsdr_reset_buffer", "int", [exports.rtlsdr_dev_tPtr]);
exports.rtlsdr_read_sync = exports.lib.func("rtlsdr_read_sync", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.inout("uint8_t *"), "int", koffi_1.default.inout("int *")]);
exports.rtlsdr_read_async_cb_t = koffi_1.default.proto("void rtlsdr_read_async_cb_t(unsigned char *buf, uint32_t len, void *ctx)");
// rtlsdr_wait_async will not be implemented as it is deprecated, subject for removal.
exports.rtlsdr_read_async = exports.lib.func("rtlsdr_read_async", "int", [exports.rtlsdr_dev_tPtr, koffi_1.default.pointer(exports.rtlsdr_read_async_cb_t), koffi_1.default.inout("void *"), "uint32_t", "uint32_t"]);
exports.rtlsdr_cancel_async = exports.lib.func("rtlsdr_cancel_async", "int", [exports.rtlsdr_dev_tPtr]);
