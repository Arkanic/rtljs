export function charArrayAlloc(length:number):Array<string> {
    let arr = [""];
    for(let i = 0; i < length; i++) arr[0] = `${arr[0]}\0`;

    return arr;
}

export function numberArrayAlloc(length:number):Array<number> {
    let arr = [];
    for(let i = 0; i < length; i++) arr.push(0);

    return arr;
}