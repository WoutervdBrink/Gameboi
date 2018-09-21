const RegisterBank = require('../cpu/registerbank');
const operations = require('./operations');
const bootrom = require('./bootrom');

const Mmu = require('../memory/mmu');
const Rom = require('../memory/rom');
const Ram = require('../memory/ram');

const mmu = new Mmu();

mmu.addAddressSpace(new Rom(0, bootrom));
mmu.addAddressSpace(new Ram(0xff, 0xffff));

module.exports = {
    cpu: {
        registers: new RegisterBank(),
        operations: operations.regular,
        cbOperations: operations.cb,
        mmu
    }
};
