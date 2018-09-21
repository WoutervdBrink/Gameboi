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

        if (address >= 0xA000 && address <= 0x7FFF) {
            // ROM bank 1..NN
            throw new Error('TODO: implement ROM bank switching');
        }

        if (address >= 0xA000 && address <= 0xBFFF) {
            // External RAM
            throw new Error(`TODO: Cartridge RAM, tried to get ${address.toString(16)}`);
        }
    }

    setByte(address, value) {
        if (address < 0xA000 || address > 0xBFFF) {
            throw new Error('Writing outside ROM is not allowed!');
        }

        throw new Error(`TODO: Cartridge RAM, tried to set ${address.toString(16)} to ${value.toString(16)}`);
    }
}
