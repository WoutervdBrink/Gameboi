const AddressSpace = require('./addressspace');

module.exports = class Rom extends AddressSpace {
    constructor(offset, data, identifier) {
        super(identifier);

        this.offset = offset;
        this.length = data.length;
        this.space = data;
    }

    accepts(address) {
        return address >= this.offset && address < (this.offset + this.length);
    }

    getByte(address) {
        return this.space[address - this.offset];
    }

    setByte(address, value) {
        throw new Error('ROM is read-only.');
    }
}
