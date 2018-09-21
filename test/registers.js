const assert = require('assert');

const Register = require('../src/cpu/register');

let register;

describe('Register', () => {
    beforeEach(() => {
        register = new Register();
    });

    afterEach(() => {
        // Dereference just to be sure GBC catches it.
        register = null;
    });

    describe('.lower', () => {
        it('should start out with 0x0', () => {
            assert.equal(register.lower, 0);
        });
        it('should give us back a value we give it', () => {
            register.lower = 0xAB;
            assert.equal(register.lower, 0xAB);
        });
        it('should only take bytes as values', () => {
            assert.throws(() => {
                register.lower = 0x1FF;
            }, TypeError);
            assert.throws(() => {
                register.lower = -1;
            }, TypeError);
        });
        it('should reflect its changes in .value', () => {
            register.lower = 0xAB;
            assert.equal(register.value, 0x00AB);
        });
    });

    describe('.higher', () => {
        it('should start out with 0x0', () => {
            assert.equal(register.higher, 0);
        });
        it('should give us back a value we give it', () => {
            register.higher = 0xAB;
            assert.equal(register.higher, 0xAB);
        });
        it('should only take bytes as values', () => {
            assert.throws(() => {
                register.higher = 0x1FF;
            }, TypeError);
            assert.throws(() => {
                register.higher = -1;
            }, TypeError);
        });
        it('should reflect its changes in .value', () => {
            register.higher = 0xAB;
            assert.equal(register.value, 0xAB00);
        });
    });

    describe('.value', () => {
        it('should start out with 0x0', () => {
            assert.equal(register.value, 0);
        });
        it('should give us back a value we give it', () => {
            register.value = 0xABCD;
            assert.equal(register.value, 0xABCD);
        });
        it('should only take words as values', () => {
            assert.throws(() => {
                register.value = 0x1FFFF;
            }, TypeError);
            assert.throws(() => {
                register.value = -1;
            }, TypeError);
        });
        it('should reflect its changes in .higher', () => {
            register.value = 0xABCD;
            assert.equal(register.higher, 0xAB);
        });
        it('should reflect its changes in .lower', () => {
            register.value = 0xABCD;
            assert.equal(register.lower, 0xCD);
        });
        it('should reflect changes in .higher and .lower', () => {
            register.higher = 0xAB;
            register.lower = 0xCD;
            assert.equal(register.value, 0xABCD);
        });
    });
});
