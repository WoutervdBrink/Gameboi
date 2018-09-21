const LCDC = 0xFF40;
const LCDSTAT = 0xFF41;
const SCX = 0xFF42;
const LY = 0xFF44;
const LYC = 0xFF45;
const BGP = 0xFF47;
const WY = 0xFF4A;
const WX = 0xFF4B;

module.exports = class Ppu {
    constructor(config) {
        this._mmu = config.mmu;

        this._lastUpdate = 0;
    }

    update(cycles) {
        if (cycles - this._lastUpdate < 114) {
            return;
        }

        this._mmu.setByte(LY, (this._mmu.getByte(LY) + 1) % 154);

        this._lastUpdate = cycles - (cycles % 114);

        // TODO: actually draw things
    }
}
