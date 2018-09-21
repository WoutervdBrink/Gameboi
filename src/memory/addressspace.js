module.exports = class AddressSpace {
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
