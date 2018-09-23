module.exports = class AddressSpace {
    constructor(identifier) {
        this._identifier = identifier;
        this._mmu = null;
        this.enabled = true;
    }
    setMmu(mmu) {
        this._mmu = mmu;
    }
    get mmu() {
        return this._mmu;
    }
    get identifier() {
        return this._identifier;
    }
    get ranges() {
        throw new Error(`Please implement ranges.`);
    }
    accepts(address) {
        throw new Error('Please implement accepts().');
    }
    getByte(address) {
        throw new Error('Please implement getByte().');
    }
    setByte(address, value) {
        throw new Error('Please implement setByte().');
    }
};
