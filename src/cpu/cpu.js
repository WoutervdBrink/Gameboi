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

        this.calledOps = [];
    }

    fixHexDump(b) {
        if (b.length < 2) { return '0' + b; }
        return b;
    }

    runOp() {
        let collection = this.operations;

        let pc = this.registers.pc.toString(16);

        let opCode = this.mmu.getByte(this.registers.pc++);
        let calledOp = this.fixHexDump(opCode.toString(16));

        if (opCode === 0xCB) {
            pc += ' ' + this.registers.pc.toString(16);
            opCode = this.mmu.getByte(this.registers.pc++);
            calledOp += this.fixHexDump(opCode.toString(16));
            collection = this.cbOperations;
        }

        let operation;

        const args = [];

        try {
            operation = collection.getOperation(opCode);

            calledOp += ` ${operation.label}`;

            if (this.calledOps.indexOf(calledOp) < 0) {
                this.calledOps.push(calledOp);
            }

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
            console.log(`${pc}: ${operation.label}   ${args.map((arg) => arg.toString(16)).join(' ')}`);
            console.log(`Memory following: ${mem}`);
            console.log('  ' + this.registers.dump());
            this.calledOps.sort();
            console.log(`Called ops:\n${this.calledOps.join('\n')}`);
            process.exit(1);
        }
    }
};
