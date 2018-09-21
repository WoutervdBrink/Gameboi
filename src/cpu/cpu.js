module.exports = class Cpu {
    constructor({
        registers,
        operations,
        cbOperations,
        mmu
    }) {
        this.registers = registers;
        this.halt = false;
        this.stop = false;
        this.clock = 0;
        this.time = 0;
        this.ime = 0;
        this.operations = operations;
        this.cbOperations = cbOperations;
        this.mmu = mmu;
    }

    runOp() {
        let collection = this.operations;

        let pc = this.registers.pc.toString(16);

        let opCode = this.mmu.getByte(this.registers.pc++);

        if (opCode === 0xCB) {
            pc += ' ' + this.registers.pc.toString(16);
            opCode = this.mmu.getByte(this.registers.pc++);
            collection = this.cbOperations;
        }

        let operation;

        try {
            operation = collection.getOperation(opCode);

            const args = [];

            for (let i = 0; i < operation.numArgs; i++) {
                args[i] = this.mmu.getByte(this.registers.pc++);
            }

            console.log(`${pc}: ${operation.label}   ${args.map((arg) => arg.toString(16)).join(' ')}`);

            operation.callback(this.registers, this.mmu, args);

            console.log('  ' + this.registers.dump());
        } catch (e) {
            console.error(e);

            let mem = '';

            for (let i = 0; i < 10; i++) {
                mem += this.mmu.getByte(this.registers.pc++).toString(16) + ' ';
            }

            console.log(`Memory following: ${mem}`);
            process.exit(1);
        }
    }
};
