const checkBit = (name, bit) => {
    if (bit < 0) {
        throw new TypeError(`${name} should be a bit!`);
    }

    if (bit > 1) {
        throw new TypeError(`${name} should be a bit!`);
    }
};

const checkByte = (name, byte) => {
    if (byte < 0x00) {
        throw new TypeError(`This ${name} should be a byte!`);
    }

    if (byte > 0xFF) {
        throw new TypeError(`This ${name} should be a byte!`);
    }
};

const checkWord = (name, word) => {
    if (word < 0x0000) {
        throw new TypeError(`This ${name} should be a word!`);
    }

    if (word > 0xFFFF) {
        throw new TypeError(`This ${name} should be a word!`);
    }
};

const toWord = (msb, lsb) => {
    if (Array.isArray(msb)) {
        return (msb[1] << 8) | msb[0];
    }

    return (msb << 8) | lsb;
};

const abs = (b) => {
    checkByte('b', b);

    if (isNegative(b)) {
        return 0x100 - b;
    }

    return b;
};

const isNegative = (b) => {
    checkByte('b', b);

    return (b & (1 << 7)) !== 0;
};

const setBit = (b, position, value) => {
    checkByte('b', b);

    if (value) {
        return (b | (1 << position)) & 0xFF;
    }

    return ~(1 << position) & b & 0xFF;
};

const getBit = (b, position) => {
    checkByte('b', b);

    return (b & (1 << position)) !== 0;
};

const getMSB = (w) => {
    checkWord('w', w);

    return w >> 8;
};

const getLSB = (w) => {
    checkWord('w', w);

    return w & 0xFF;
};

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

module.exports = {
    checkBit, checkByte, checkWord, toWord, abs, isNegative, setBit, getBit, getMSB, getLSB, sleep
};
