// Grab the payload from the command line arguments
const payload = process.argv[2];

// What if you forget the payload?
if (!payload) {
    console.error("Usage: node your-script-name.js <payload>\n");
    process.exit(1);
}

console.log("[+] Got payload. Let's get to work...");

// One-liner RLE decoding? Almost.
let rleCount = 0;
const bytecode = Buffer.from(payload.substring(4).match(/../g).flatMap(chunk => {
    if (chunk[1] === 'Q') {
        rleCount = parseInt(chunk[0]);
        return [];
    }
    const byteVal = parseInt(chunk, 16);
    const result = Array(rleCount || 1).fill(byteVal);
    rleCount = 0;
    return result;
}));

let pos = 0;
// Helper to read data and automatically advance our position
const read = (method, size) => {
    const value = bytecode[method](pos);
    pos += size;
    return value;
};

// Main parsing logic
const numConstants = read('readUInt32LE', 4);
const constants = Array.from({ length: numConstants }, () => {
    switch (read('readUInt8', 1)) {
        case 1: return read('readUInt8', 1) !== 0;
        case 2: return read('readDoubleLE', 8);
        case 3: {
            const len = read('readUInt32LE', 4);
            const str = bytecode.slice(pos, pos + len).toString();
            pos += len;
            return str;
        }
        default: return null;
    }
});

// Output
console.log(`\n[+] Found ${numConstants} constants:`);
console.log(constants.map((c, i) => `  [${i}] (${c?.constructor.name ?? 'nil'}): ${JSON.stringify(c)}`).join('\n'));
