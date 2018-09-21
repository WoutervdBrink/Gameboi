const Register = require('./register');

const {checkBit, checkByte, isNegative, abs} = require('../util');

const setOrClear = (value, bit, mask) => {
    checkBit(bit);

    if (bit) {
        return value | mask;
    }

    return value & ~mask;
};

const FLAG_MASKS = {
    z: 0b10000000,
    n: 0b01000000,
    h: 0b00100000,
    c: 0b00010000
};

module.exports = class RegisterBank {
    constructor() {
        this._af = new Register();
        this._bc = new Register();
        this._de = new Register();
        this._hl = new Register();

        this.sp = 0;
        this.pc = 0;

        this.ime = 0;
    }

    dump() {
        const af = this._af.toString();
        const bc = this._bc.toString();
        const de = this._de.toString();
        const hl = this._hl.toString();

        const sp = this.sp.toString(16);
        const pc = this.pc.toString(16);

        const registers = `AF: ${af} BC: ${bc} DE: ${de} HL: ${hl}`;

        const flags = `Z:${this.f_z} N:${this.f_n} H:${this.f_h} C:${this.f_c}`;

        return `${registers} ${flags} SP: ${sp} PC: ${pc}`;
    }

    get f_z() { return (this._af.lower & FLAG_MASKS.z) >> 7 }
    set f_z(z) { this._af.lower = setOrClear(this._af.lower, z, FLAG_MASKS.z); }

    get f_n() { return (this._af.lower & FLAG_MASKS.n) >> 6 }
    set f_n(n) { this._af.lower = setOrClear(this._af.lower, n, FLAG_MASKS.n); }

    get f_h() { return (this._af.lower & FLAG_MASKS.h) >> 5 }
    set f_h(h) { this._af.lower = setOrClear(this._af.lower, h, FLAG_MASKS.h); }

    get f_c() { return (this._af.lower & FLAG_MASKS.c) >> 4 }
    set f_c(c) { this._af.lower = setOrClear(this._af.lower, c, FLAG_MASKS.c); }

    get a() { return this._af.higher; }
    set a(a) { this._af.higher = a; }
    get f() { return this._af.lower; }
    set f(f) { this._af.lower = f & 0xF0; }
    get af() { return this._af.value; }
    set af(af) { this._af.value = af; }

    get b() { return this._bc.higher; }
    set b(b) { this._bc.higher = b; }
    get c() { return this._bc.lower; }
    set c(c) { this._bc.lower = c; }
    get bc() { return this._bc.value; }
    set bc(bc) { this._bc.value = bc; }

    get d() { return this._de.higher; }
    set d(d) { this._de.higher = d; }
    get e() { return this._de.lower; }
    set e(e) { this._de.lower = e; }
    get de() { return this._de.value; }
    set de(de) { this._de.value = de; }

    get h() { return this._hl.higher; }
    set h(h) { this._hl.higher = h; }
    get l() { return this._hl.lower; }
    set l(l) { this._hl.lower = l; }
    get hl() { return this._hl.value; }
    set hl(hl) { this._hl.value = hl; }

    incrementHL() {
        const old = this._hl.value;
        this._hl.value = (old + 1) % 0xFFFF;
        return old;
    }

    decrementHL() {
        const old = this._hl.value;
        this._hl.value = (old - 1) % 0xFFFF;
        return old;
    }

    incrementSP() {
        this.sp = (this.sp + 1) % 0xFFFF;
    }

    decrementSP() {
        this.sp = (this.sp - 1) % 0xFFFF;
    }

    addToPC(b) {
        checkByte('b', b);

        if (isNegative(b)) {
            this.pc = (this.pc - abs(b)) & 0xFFFF;
        } else {
            this.pc = (this.pc + abs(b)) & 0xFFFF;
        }
    }
};
