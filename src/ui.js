const path = require('path');

const {app, BrowserWindow, ipcMain} = require('electron');

const fs = require('fs');
const cluster = require('cluster');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);

const Cpu = require('./cpu/cpu');
const Cartridge = require('./memory/cartridge');
const Ppu = require('./graphics/ppu');

const config = require('./config');

const colors = [
    255, 187, 55, 0
];

const packFrame = (frame) => {
    const result = [];

    for (let y = 0; y < 144; y++) {
        for (let x = 0; x < 160; x++) {
            //console.log(`Packing frame: ${y} ${x}`);
            result.push(colors[frame[y][x]]);
        }
    }

    return result;
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running.`);

    const worker = cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code}.`);
        process.exit(1);
    });

    worker.on('message', (message) => {
        if (message.message === 'frame') {
            if (mainWindow) {
                mainWindow.webContents.send('frame', packFrame(message.frame));
            }
        }
    });

    let mainWindow;

    const createWindow = () => {
        mainWindow = new BrowserWindow({
            width: 640,
            height: 400,
            resizable: false
        });

        mainWindow.loadFile(path.join(__dirname, 'client/index.html'));

        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    };

    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        app.quit();
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
} else {
    console.log(`Worker ${process.pid} started.`);

    process.on('message', (msg) => {
        if (msg.message === 'quit') {
            console.log(`Worker ${process.pid} is quitting.`);
            process.exit(0);
        }
    });
    (async () => {
        const rom = await readFileAsync(path.join(__dirname, '../roms/tetris.gb'));

        const cartridge = new Cartridge(rom, 'cartridge');

        config.cpu.mmu.addAddressSpace(cartridge);

        const ppu = new Ppu(config.ppu);

        const cpu = new Cpu({
            ...config.cpu,
            ppu
        });

        ppu.on('frame', (frame) => {
            process.send({message: 'frame', frame});
        });

        while (true) {
            cpu.runOp();
        }
    })();
}
