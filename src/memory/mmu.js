module.exports = class Mmu {
    constructor() {
        this.addressSpaces = [];
    }

    addAddressSpace(addressSpace) {
        addressSpace.setMmu(this);

        this.addressSpaces.push(addressSpace);
    }

    disableAddressSpace(identifier) {
        this.addressSpaces.forEach((space) => {
            if (space.identifier === identifier) {
                space.enabled = false;
            }
        });
    }

    enableAddressSpace(identifier) {
        this.addressSpaces.forEach((space) => {
            if (space.identifier === identifier) {
                space.enabled = true;
            }
        });
    }

    getByte(address) {
        const space = this.addressSpaces.find((space) => space.enabled && space.accepts(address));

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

        space.setByte(address, value);
    }
};
