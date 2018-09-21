module.exports = class Mmu {
    constructor() {
        this.addressSpaces = [];
    }

    addAddressSpace(addressSpace) {
        addressSpace.setMmu(this);

        this.addressSpaces.push(addressSpace);
    }

    getAddressSpace(identifier) {
        const space = this.addressSpaces.find((space) => space.enabled && space.identifier === identifier);

        if (space === undefined) {
            throw new Error(`Could not find address space with identifier ${identifier}.`);
        }

        return space;
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

        const b = space.getByte(address);
        if (typeof b === 'undefined') {
            throw new Error(`Reading from ${address.toString(16)} gave undefined!`);
        }
        return b;
    }

    setByte(address, value) {
        const space = this.addressSpaces.find((space) => space.accepts(address));

        if (space === undefined) {
            throw new Error(`Could not find a suitable address space for $${address.toString(16)}.`);
        }

        space.setByte(address, value);
    }
};
