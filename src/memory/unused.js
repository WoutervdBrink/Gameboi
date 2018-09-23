const AddressSpace = require('./addressspace');

module.exports = class Unused extends AddressSpace {
    constructor(offset, length, identifier) {
        super(identifier);

        this.offset = offset;
        this.length = length;
    }

    get ranges() {
        return [[this.offset, this.offset + this.length]];
    }

    getByte(address) {
        return 0xFF;
    }

    setByte(address, value) {
        // Does nothing.
    }
}
