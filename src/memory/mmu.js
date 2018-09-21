module.exports = class Mmu {
    constructor() {
        this.addressSpaces = [];
    }

    addAddressSpace(addressSpace) {
        this.addressSpaces.push(addressSpace);
    }

    getByte(address) {
        const space = this.addressSpaces.find((space) => space.accepts(address));

        if (space === undefined) {
            throw new Error(`Could not find a suitable address space for $${address.toString(16)}.`);
        }

        return space.getByte(address);
    }

    setByte(address, value) {
        const space = this.addressSpaces.find((space) => space.accepts(address));

        if (space === undefined) {
            throw new Error(`Could not find a suitable address space for $${address.toString(16)}.`);
        }

        space.setByte(value);
    }
};
