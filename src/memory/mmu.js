module.exports = class Mmu {
    constructor() {
        this.addressSpaces = {};

        this.cache = [];
    }

    addAddressSpace(addressSpace) {
        addressSpace.setMmu(this);

        this.addressSpaces[addressSpace.identifier] = addressSpace;

        this._buildCacheForSpace(addressSpace);
    }

    _buildCacheForSpace(space) {
        space.ranges.forEach((range) => {
            for (let i = range[0]; i <= range[1]; i++) {
                this.cache[i] = space;
            }
        });
    }

    _rebuildCache() {
        this.cache = [];

        Object.keys(this.addressSpaces).forEach((identifier) => {
            const space = this.addressSpaces[identifier];

            if (!space.enabled) {
                return;
            }

            this._buildCacheForSpace(space);
        });
    }

    getAddressSpace(identifier) {
        if (this.addressSpaces[identifier]) {
            return this.addressSpaces[identifier];
        }

        throw new Error(`Could not find address space with identifier ${identifier}`);
    }

    findAddressSpace(address) {
        const space = this.cache[address];

        if (space) {
            return space;
        }

        throw new Error(`Could not find address space for $${address.toString(16)}.`);
    }

    disableAddressSpace(identifier) {
        this.getAddressSpace(identifier).enabled = false;
    }

    enableAddressSpace(identifier) {
        this.getAddressSpace(identifier).enabled = true;
    }

    getByte(address) {
        return this.findAddressSpace(address).getByte(address);
    }

    setByte(address, value) {
        this.findAddressSpace(address).setByte(address, value);
    }
};
