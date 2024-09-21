"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.charArrayAlloc = charArrayAlloc;
exports.numberArrayAlloc = numberArrayAlloc;
function charArrayAlloc(length) {
    let arr = [""];
    for (let i = 0; i < length; i++)
        arr[0] = `${arr[0]}\0`;
    return arr;
}
function numberArrayAlloc(length) {
    let arr = [];
    for (let i = 0; i < length; i++)
        arr.push(0);
    return arr;
}
