const AddressSpace = require('./addressspace');

module.exports = class Ram extends AddressSpace {
    constructor(offset, length, identifier) {
        super(identifier);

        this.space = new Uint8Array(length);

        for (let i = 0; i <= length; i++) {
            this.space[i] = 0x00;
        }

        this.offset = offset;
        this.length = length;
    }

    get ranges() {
        return [[this.offset, this.offset + this.length]];
    }

    getByte(address) {
        return this.space[address - this.offset];
    }

    setByte(address, value) {
        this.space[address - this.offset] = value;
    }
}
