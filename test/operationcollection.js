const assert = require('assert');

const OperationCollection = require('../src/cpu/operationcollection');

let collection;

const operation = {
    opCode: 0x1, cycles: 1, numArgs: 1, label: 'TEST', callback: null
};

describe('OperationCollection', () => {
    beforeEach(() => {
        collection = new OperationCollection();
    });

    afterEach(() => {
        collection = null;
    });

    it('should not find any operation if we do not define any', () => {
        assert.throws(() => {
            collection.getOperation(operation.opCode);
        }, Error);
    });

    it('should find an operation if we define one', () => {
        collection.defineOperation(operation.opCode, operation.cycles, operation.numArgs, operation.label, operation.callback);
        assert.deepStrictEqual(collection.getOperation(operation.opCode), operation);
    });

    it('should not find a defined operation with an other opcode', () => {
        collection.defineOperation(operation.opCode, operation.cycles, operation.numArgs, operation.label, operation.callback);
        assert.throws(() => {
            collection.getOperation(operation.opCode + 1);
        }, Error);
    });
})
