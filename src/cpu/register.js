const {checkByte, checkWord} = require('../util');

module.exports = class Register {
    constructor() {
        this._higher = 0;
        this._lower = 0;
    }

    get higher() {
        return this._higher;
    }

    set higher(higher) {
        checkByte('value', higher);

        this._higher = higher;
    }

    get lower() {
        return this._lower;
    }

    set lower(lower) {
        checkByte('value', lower);

        this._lower = lower;
    }

    get value() {
        return (this.higher << 8 | this.lower);
    }

    set value(value) {
        checkWord('value', value);

        value = value & 0xFFFF;

        this.higher = value >> 8;
        this.lower = value & 0x00FF;
    }

    toString() {
        let string = this.value.toString(16);

        while (string.length < 4) {
            string = `0${string}`;
        }

        return string;
    }
}
