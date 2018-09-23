const LCDC = 0xFF40;
const LCDSTAT = 0xFF41;
const SCX = 0xFF43;
const SCY = 0xFF42;
const LY = 0xFF44;
const LYC = 0xFF45;
const BGP = 0xFF47;
const WY = 0xFF4A;
const WX = 0xFF4B;

const {EventEmitter} = require('events');

module.exports = class Ppu extends EventEmitter {
    constructor(config) {
        super();

        this._mmu = config.mmu;

        this._lastUpdate = 0;

        this.lcd = [];

        for (let y = 0; y < 144; y++) {
            this.lcd[y] = [];
            for (let x = 0; x < 160; x++) {
                this.lcd[y][x] = 0;
            }
        }
    }

    update(cycles) {
        if (cycles - this._lastUpdate < 114) {
            return;
        }

        this._lastUpdate = cycles - (cycles % 114);

        const line = (this._mmu.getByte(LY) + 1) % 154;

        this._mmu.setByte(LY, line);

        this.drawLine(line);
    }

    drawLine(line) {
        if (line >= 144) {
            if (line === 144) {
                this.emit('frame', this.lcd);
            }
            return; // Vblank
        }

        this.lcd[line] = this.getBackground(line);
    }

    getBackground(line) {



        const scrollX = this._mmu.getByte(SCX);
        const scrollY = this._mmu.getByte(SCY);

        const bgTileMapStart = (this._mmu.getByte(LCDC) >> 3 & 1) ? 0x9C00 : 0x9800;
        const bgWindowDataStart = (this._mmu.getByte(LCDC) >> 4 & 1) ? 0x8000 : 0x8800;

        const pallette = this._mmu.getByte(BGP);

        const result = [];

        for (let x = 0; x < 160; x++) {
            const targetX = x + scrollX;
            const targetY = line + scrollY;

            const tileX = Math.floor(targetX / 8);
            const tileY = Math.floor(targetY / 8);

            const tileAddress = bgTileMapStart + tileY * 32 + tileX;
            const dataAddress = bgWindowDataStart + this._mmu.getByte(tileAddress) * 16;

            const lsb = this._mmu.getByte(dataAddress + (targetY % 8) * 2);
            const msb = this._mmu.getByte(dataAddress + (targetY % 8) * 2 + 1);

            const byte = 7 - (x % 8);
            const colorId = (msb >> byte & 1) << 1 | (lsb >> byte & 1);

            const color = pallette >> (colorId * 2) & 3;

            result[x] = color;
        }

        return result;
    }
}
