import koffi from "koffi";
export declare const lib: koffi.IKoffiLib;
export declare const rtlsdr_dev_tPtr: koffi.IKoffiCType;
export declare const rtlsdr_dev_tPtrPtr: koffi.IKoffiCType;
export declare const rtlsdr_tunerEnum: string[];
export declare const rtlsdr_tunerPtr: koffi.IKoffiCType;
export declare const rtlsdr_ds_modeEnum: string[];
export declare const rtlsdr_ds_modePtr: koffi.IKoffiCType;
export declare const rtlsdr_get_device_count: koffi.KoffiFunction;
export declare const rtlsdr_get_device_name: koffi.KoffiFunction;
export declare const rtlsdr_get_device_usb_strings: koffi.KoffiFunction;
export declare const rtlsdr_get_index_by_serial: koffi.KoffiFunction;
export declare const rtlsdr_open: koffi.KoffiFunction;
export declare const rtlsdr_close: koffi.KoffiFunction;
export declare const rtlsdr_set_xtal_freq: koffi.KoffiFunction;
export declare const rtlsdr_get_xtal_freq: koffi.KoffiFunction;
export declare const rtlsdr_get_usb_strings: koffi.KoffiFunction;
export declare const rtlsdr_write_eeprom: koffi.KoffiFunction;
export declare const rtlsdr_read_eeprom: koffi.KoffiFunction;
export declare const rtlsdr_set_center_freq: koffi.KoffiFunction;
export declare const rtlsdr_get_center_freq: koffi.KoffiFunction;
export declare const rtlsdr_set_freq_correction: koffi.KoffiFunction;
export declare const rtlsdr_get_freq_correction: koffi.KoffiFunction;
export declare const rtlsdr_get_tuner_type: koffi.KoffiFunction;
export declare const rtlsdr_get_tuner_gains: koffi.KoffiFunction;
export declare const rtlsdr_set_tuner_gain: koffi.KoffiFunction;
export declare const rtlsdr_set_tuner_bandwidth: koffi.KoffiFunction;
export declare const rtlsdr_get_tuner_gain: koffi.KoffiFunction;
export declare const rtlsdr_set_tuner_if_gain: koffi.KoffiFunction;
export declare const rtlsdr_set_tuner_gain_mode: koffi.KoffiFunction;
export declare const rtlsdr_set_sample_rate: koffi.KoffiFunction;
export declare const rtlsdr_get_sample_rate: koffi.KoffiFunction;
export declare const rtlsdr_set_testmode: koffi.KoffiFunction;
export declare const rtlsdr_set_agc_mode: koffi.KoffiFunction;
export declare const rtlsdr_set_direct_sampling: koffi.KoffiFunction;
export declare const rtlsdr_get_direct_sampling: koffi.KoffiFunction;
export declare const rtlsdr_set_offset_tuning: koffi.KoffiFunction;
export declare const rtlsdr_get_offset_tuning: koffi.KoffiFunction;
export declare const rtlsdr_reset_buffer: koffi.KoffiFunction;
export declare const rtlsdr_read_sync: koffi.KoffiFunction;
export declare const rtlsdr_read_async_cb_t: koffi.IKoffiCType;
export declare const rtlsdr_read_async: koffi.KoffiFunction;
export declare const rtlsdr_cancel_async: koffi.KoffiFunction;
