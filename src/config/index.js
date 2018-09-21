const RegisterBank = require('../cpu/registerbank');
const operations = require('./operations');
const bootrom = require('./bootrom');

const Mmu = require('../memory/mmu');
const Rom = require('../memory/rom');
const Ram = require('../memory/ram');
const Unused = require('../memory/unused');
const Ioports = require('../memory/ioports');

const mmu = new Mmu();

mmu.addAddressSpace(new Rom(0, bootrom, 'bootrom'));   // 0000 - 0099 Boot ROM
// Cartridge gets added after this. When DMG disable is set, the bootrom address
// space is removed and 0x00 - 0x99 suddenly becomes the cartridge.
mmu.addAddressSpace(new Ram(0x8000, 0x1FFF, 'vram'));  // 8000 - 9FFF VRAM
mmu.addAddressSpace(new Ram(0xC000, 0x0FFF, 'wram0')); // C000 - CFFF WRAM 0
mmu.addAddressSpace(new Ram(0xD000, 0x0FFF, 'wram1')); // D000 - DFFF WRAM 1
mmu.addAddressSpace(new Ram(0xFE00, 0x9F, 'oam'));     // FE00 - FE9F OAM
mmu.addAddressSpace(new Unused(0xFEA0, 0x5F, 'null')); // FEA0 - FEFF Unused
mmu.addAddressSpace(new Ioports());                    // FF00 - FF7F I/O ports
mmu.addAddressSpace(new Ram(0xFF80, 0x7E, 'hram'));    // FF80 - FFFE hram
mmu.addAddressSpace(new Ram(0xFFFF, 0x01, 'ier'));     // FFFF        interrupt enable register

module.exports = {
    cpu: {
        registers: new RegisterBank(),
        operations: operations.regular,
        cbOperations: operations.cb,
        mmu
    },


    ppu: {
        mmu
    }
};
