const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);

const Cpu = require('./cpu/cpu');
const Cartridge = require('./memory/cartridge');
const Ppu = require('./graphics/ppu');
const Debugger = require('./debugger');

const config = require('./config');

(async () => {
    const rom = await readFileAsync(path.join(__dirname, '../roms/tetris.gb'));

    const cartridge = new Cartridge(rom, 'cartridge');

    config.cpu.mmu.addAddressSpace(cartridge);

    const ppu = new Ppu(config.ppu);

    const cpu = new Cpu({
        ...config.cpu,
        ppu
    });

    const dbger = new Debugger(cpu);

    dbger.start();
})();
