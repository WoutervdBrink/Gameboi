const {checkBit, checkByte, checkWord, abs, getMSB, getLSB, toWord} = require('../util');

const addBytes = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    r.f_z = ((b1 + b2) & 0xFF) === 0;
    r.f_n = 0;
    r.f_h = ((b1 & 0x0F) + (b2 & 0x0F)) > 0x0F;
    r.f_c = (b1 + b2) > 0xFF;

    return (b1 + b2) & 0xFF;
};

const addBytesAndCarry = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    const carry = f.c;

    r.f_z = ((b1 + b2 + carry) & 0xFF) === 0;
    r.f_n = 0;
    r.f_h = ((b1 & 0x0F) + (b2 & 0x0F) + carry) > 0x0F;
    r.f_c = (b1 + b2 + carry) > 0xFF;

    return (b1 + b2 + carry) & 0xFF;
};

const addWords = (r, w1, w2) => {
    checkWord('w1', w1);
    checkWord('w2', w2);

    r.f_n = 0;
    r.f_h = ((w1 & 0x0FFF) + (w2 & 0x0FFF)) > 0x0FFF;
    r.f_c = (w1 + w2) > 0xFFFF;

    return (w1 + w2) & 0xFFFF;
};

const subBytes = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    r.f_z = ((b1 - b2) & 0xFF) === 0;
    r.f_n = 1;
    r.f_h = (b2 & 0x0F) > (b1 & 0x0F);
    r.f_c = b2 > b1;

    return (b1 - b2) % 0xFF;
};

const subBytesWithCarry = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    const carry = r.f_c;

    r.f_z = ((b1 - b2 - carry) & 0xFF) === 0;
    r.f_n = 1;
    r.f_h = ((b2 + carry) & 0x0F) > (b1 & 0x0F);
    r.f_c = ((b2 + carry) > b1);

    return (b1 - b2 - carry) % 0xFF;
};

const and = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    const result = b1 & b2;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 1;
    r.f_c = 0;

    return result;
};

const or = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    const result = b1 | b2;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;
    r.f_c = 0;

    return result;
};

const xor = (r, b1, b2) => {
    checkByte('b1', b1);
    checkByte('b2', b2);

    const result = b1 ^ b2;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;
    r.f_c = 0;

    return result;
};

const inc = (r, b) => {
    checkByte('b', b);

    const result = (b + 1) & 0xFF;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = (result & 0x0F) < (b & 0x0F);

    return result;
};

const dec = (r, b) => {
    checkByte('b', b);

    const result = (b - 1) & 0xFF;

    r.f_z = result === 0;
    r.f_n = 1;
    r.f_h = (b & 0x0F) === 0;

    return result;
};

const swap = (r, b) => {
    checkByte('b', b);

    const upper = b & 0xF0;
    const lower = b & 0x0F;
    const result = (lower << 4) | (upper >> 4);

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;
    r.f_c = 0;
};

const rotateLeft = (r, b) => {
    checkByte('b', b);

    let result = (b << 1) & 0xFF;

    if ((b & (1 << 7)) !== 0) {
        result |= 1;
        r.f_c = 1;
    } else {
        r.f_c = 0;
    }
    f.z = result === 0;
    f.n = 0;
    f.h = 0;

    return result;
};

const rotateLeftThroughCarry = (r, b) => {
    checkByte('b', b);

    let result = (b << 1) & 0xFF;

    result |= (r.f_c ? 1 : 0);

    r.f_c = (b & (1 << 7)) !== 0;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const rotateRight = (r, b) => {
    checkByte('b', b);

    let result = b >> 1;

    if ((b & 1) === 1) {
        result |= (1 << 7);
        r.f_c = 1;
    } else {
        r.f_c = 0;
    }

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const rotateRightThroughCarry = (r, b) => {
    checkByte('b', b);

    let result = b >> 1;

    result |= r.f_c ? (1 << 7) : 0;

    r.f_c = (b & 1) !== 0;

    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const addSignedByteToWord = (f, w, b) => {
    checkWord('w', w);
    checkByte('b', b);

    r.f_z = 0;
    r.f_n = 0;

    let absB = abs(b);

    if (isNegative(b)) {
        r.f_h = ((w & 0x0F) < (absB & 0x0F));
        r.f_c = ((w & 0xFF) < absB);
        return (w - absB) % 0xFFFF;
    }

    r.f_c = ((w & 0xFF) + absB) > 0xFF;
    r.f_h = ((w & 0x0F) + (absB & 0x0F)) > 0x0F;
    return (w + absB) & 0xFFFF;
};

const shiftLeft = (r, b) => {
    checkByte('b', b);

    const result = (b << 1) & 0xFF;

    r.f_c = (b & (1 << 7)) !== 0;
    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const shiftRightArithmetic = (r, b) => {
    checkByte('b', b);

    const result = (b >> 1) | (b & (1 << 7));

    r.f_c = (b & 1) !== 0;
    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const shiftRightLogical = (r, b) => {
    checkByte('b', b);

    const result = (b >> 1);

    r.f_c = (b & 1) !== 0;
    r.f_z = result === 0;
    r.f_n = 0;
    r.f_h = 0;

    return result;
};

const push = (r, m, w) => {
    checkWord('w', w);

    r.decrementSP();
    m.setByte(r.sp, getMSB(w));
    r.decrementSP();
    m.setByte(r.sp, getLSB(w));
};

const pop = (r, m) => {
    const lsb = m.getByte(r.sp);
    r.incrementSP();
    const msb = m.getByte(r.sp);
    r.incrementSP();

    return toWord(msb, lsb);
};

const bit = (r, b, bit) => {
    checkByte('b', b);
    checkByte('bit', bit);

    r.f_n = 0;
    r.f_h = 1;

    if (bit < 8) {
        r.f_z = ((b & (1 << bit)) !== 0);
    }
};

const call = (r, m, address) => {
    checkWord('address', address);

    push(r, m, (r.pc + 3) & 0xFFFF);

    r.pc = address;
};

const reset = (r, m, address) => {
    checkByte('address', address);

    push(r, m, r.pc);

    r.pc = address;
};

const ret = (r, m) => {
    r.pc = pop(r, m);
};

module.exports = {addBytes, addBytesAndCarry, subBytes, subBytesWithCarry, and,
    or, xor, inc, dec, swap, rotateLeft, rotateLeftThroughCarry, rotateRight,
    rotateRightThroughCarry, addSignedByteToWord, shiftLeft, shiftRightLogical,
    shiftRightArithmetic, push, pop, bit, call, reset, ret};
