const RegisterBank = require('../cpu/registerbank');
const operations = require('./operations');
const bootrom = require('./bootrom');

const Mmu = require('../memory/mmu');
const Rom = require('../memory/rom');
const Ram = require('../memory/ram');
const Ioports = require('../memory/ioports');

const mmu = new Mmu();

mmu.addAddressSpace(new Rom(0, bootrom, 'bootrom'));
mmu.addAddressSpace(new Ram(0x8000, 0x1FFF, 'vram'));
mmu.addAddressSpace(new Ram(0xC000, 0x0FFF, 'wram0'));
mmu.addAddressSpace(new Ram(0xD000, 0x0FFF, 'wram1'));
mmu.addAddressSpace(new Ioports());
mmu.addAddressSpace(new Ram(0xFF80, 0x7E, 'hram'));

module.exports = {
    cpu: {
        registers: new RegisterBank(),
        operations: operations.regular,
        cbOperations: operations.cb,
        mmu
    }
};
