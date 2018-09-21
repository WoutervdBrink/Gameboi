const AddressSpace = require('./addressspace');

module.exports = class Cartridge extends AddressSpace {
    constructor(rom, identifier) {
        super(identifier);

        this._rom = rom;

        let title = '';

        for (let i = 0x0134; i <= 0x0143; i++) {
            if (this._rom[i] === 0x00) {
                break;
            }
            title += this._rom[i];
        }

        this._title = title;
    }

    get title() {
        return this._title;
    }

    accepts(address) {
        return (address >= 0 && address <= 0x7FFF) || (address >= 0xA000 && address <= 0xBFFF);
    }

    getByte(address) {
        if (address >= 0 && address <= 0x3FFF) {
            // ROM bank 0
            return this._rom[address];
        }

        if (address >= 0x4000 && address <= 0x7FFF) {
            // ROM bank 1..NN
            return this._rom[address];
        }

        if (address >= 0xA000 && address <= 0xBFFF) {
            // External RAM
            throw new Error(`TODO: Cartridge RAM, tried to get ${address.toString(16)}`);
        }
    }

    setByte(address, value) {
        if (address < 0xA000 || address > 0xBFFF) {
            console.warn(`Warning: Tried to write to ${address.toString(16)} in ROM, which is not allowed.`);
            return;
        }

        throw new Error(`TODO: Cartridge RAM, tried to set ${address.toString(16)} to ${value.toString(16)}`);
    }
}
