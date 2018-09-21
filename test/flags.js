const assert = require('assert');

const RegisterBank = require('../src/cpu/registerbank');

let bank;

describe('RegisterBank', () => {
    beforeEach(() => {
        bank = new RegisterBank();
    });

    afterEach(() => {
        bank = null;
    });

    describe('.z', () => {
        it('should start out with 0', () => {
            assert.equal(bank.f_z, 0);
        });
        it('should be settable', () => {
            bank.f_z = 1;
            assert.equal(bank.f_z, 1);

            bank.f_z = 0;
            assert.equal(bank.f_z, 0);
        });
        it('should not affect other flags', () => {
            bank.f_z = 1;
            assert.equal(bank.f_n, 0);
            assert.equal(bank.f_h, 0);
            assert.equal(bank.f_c, 0);
        });
    });

    describe('.n', () => {
        it('should start out with 0', () => {
            assert.equal(bank.f_n, 0);
        });
        it('should be settable', () => {
            bank.f_n = 1;
            assert.equal(bank.f_n, 1);

            bank.f_n = 0;
            assert.equal(bank.f_n, 0);
        });
        it('should not affect other flags', () => {
            bank.f_n = 1;
            assert.equal(bank.f_z, 0);
            assert.equal(bank.f_h, 0);
            assert.equal(bank.f_c, 0);
        });
    });

    describe('.h', () => {
        it('should start out with 0', () => {
            assert.equal(bank.f_h, 0);
        });
        it('should be settable', () => {
            bank.f_h = 1;
            assert.equal(bank.f_h, 1);

            bank.f_h = 0;
            assert.equal(bank.f_h, 0);
        });
        it('should not affect other flags', () => {
            bank.f_h = 1;
            assert.equal(bank.f_z, 0);
            assert.equal(bank.f_n, 0);
            assert.equal(bank.f_c, 0);
        });
    });

    describe('.c', () => {
        it('should start out with 0', () => {
            assert.equal(bank.f_c, 0);
        });
        it('should be settable', () => {
            bank.f_c = 1;
            assert.equal(bank.f_c, 1);

            bank.f_c = 0;
            assert.equal(bank.f_c, 0);
        });
        it('should not affect other flags', () => {
            bank.f_c = 1;
            assert.equal(bank.f_z, 0);
            assert.equal(bank.f_n, 0);
            assert.equal(bank.f_h, 0);
        });
    });
});
