const rtljs = require("../");

let count = rtljs.getDeviceCount();
console.log(`Found ${count} devices!`);

for(let i = 0; i < count; i++) {
    console.log(`Index ${i}:`);

    let name = rtljs.getDeviceName(i);
    console.log(`  Name: ${name}`);

    let strings = rtljs.getDeviceUSBStrings(i);
    console.log(`  Manufacturer: ${strings.manufacturer}\n  Product: ${strings.product}\n  Serial: ${strings.serial}`);
    console.log("");

    let idx = rtljs.getIndexBySerial(strings.serial);
    console.log(`  Index from serial: ${idx}`);

    console.log("  Opening device...");
    let device = rtljs.open(i);
    console.log("  OK\n");

    let xtal = device.getXtalFreq();
    console.log(`  RTL clock freq: ${xtal.rtlFreq}Hz\n  Tuner clock freq: ${xtal.tunerFreq}Hz`);

    console.log("  Setting RTL and Tuner clocks to the same...");
    device.setXtalFreq(xtal.rtlFreq, xtal.tunerFreq);

    console.log("  Setting centre frequency to 1090MHz...");
    device.setCenterFreq(1090000000);

    let cfreq = device.getCenterFreq();
    console.log(`  Read current centre frequency: ${cfreq}Hz`);

    let ppm = device.getFreqCorrection();
    console.log(`  Current frequency correction: ${ppm}ppm`);

    console.log("  Setting frequency correction to 1ppm");
    device.setFreqCorrection(1);

    let type = device.getTunerType();
    console.log(`Tuner is a ${type}`);

    let gains = device.getTunerGains(null);
    console.log(gains);
}