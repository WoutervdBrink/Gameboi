const TODO = (r, m, a) => {throw new Error('Todo!')};

module.exports = class OperationCollection {
    constructor() {
        this.operations = [];
    }

    getOperation(opCode) {
        if (typeof this.operations[opCode] !== 'undefined') {
            return this.operations[opCode];
        }

        throw new Error(`Operation ${opCode.toString(16)} is not defined!`);
    }

    defineOperation(opCode, cycles, numArgs, label, callback) {
        if (typeof this.operations[opCode] !== 'undefined') {
            throw new Error(`Operation ${opCode.toString(16)} is already defined!`);
        }
        this.operations[opCode] = {opCode, cycles, numArgs, label, callback};
    }
};
