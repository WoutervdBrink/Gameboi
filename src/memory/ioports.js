const AddressSpace = require('./addressspace');

module.exports = class Ioports extends AddressSpace {
    constructor() {
        super('ioports');

        this.space = [];

        for (let i = 0; i < 0x7F; i++) {
            this.space[i] = 0x00;
        }
    }

    accepts(address) {
        return address >= 0xFF00 && address <= 0xFF7F;
    }

    getByte(address) {
        return this.space[address - 0xFF00];
    }

    setByte(address, value) {
        console.log(`IO: setByte(${address.toString(16)}, ${value.toString(16)})`);
        this.space[address - 0xFF00] = value;

        if (address == 0xFF50) {
            // 1 = turn off DMG ROM, enable cartridge ROM
            if (value) {
                this.mmu.disableAddressSpace('bootrom');
            } else {
                this.mmu.enableAddressSpace('bootrom');
            }
        }
    }
}
