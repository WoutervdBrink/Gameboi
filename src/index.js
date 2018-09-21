const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);

const Cpu = require('./cpu/cpu');
const Cartridge = require('./memory/cartridge');

const config = require('./config');

(async () => {
    const rom = await readFileAsync(path.join(__dirname, '../roms/tetris.gb'));

    const cartridge = new Cartridge(rom, 'cartridge');

    config.cpu.mmu.addAddressSpace(cartridge);

    const cpu = new Cpu(config.cpu);

    while (true) {
        cpu.runOp();
    }
})();
