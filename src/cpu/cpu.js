module.exports = class Cpu {
    constructor({
        registers,
        operations,
        cbOperations,
        mmu,
        ppu
    }) {
        this.registers = registers;
        this.halt = false;
        this.stop = false;
        this.cycles = 0;
        this.time = 0;
        this.ime = 0;
        this.operations = operations;
        this.cbOperations = cbOperations;
        this.mmu = mmu;
        this.ppu = ppu;

        this.calledOps = [];
    }

    fixHexDump(b) {
        if (b.length < 2) { return '0' + b; }
        return b;
    }

    runOp() {
        try {
            let collection = this.operations;

            let pc = this.registers.pc.toString(16);

            let opCode = this.mmu.getByte(this.registers.pc++);

            if (typeof opCode === 'undefined') {
                console.warn(`opCode from ${pc} was undefined!`);
                process.exit(1);
            }
            let calledOp = this.fixHexDump(opCode.toString(16));

            if (opCode === 0xCB) {
                pc += ' ' + this.registers.pc.toString(16);
                opCode = this.mmu.getByte(this.registers.pc++);
                calledOp += this.fixHexDump(opCode.toString(16));
                collection = this.cbOperations;
            }

            let operation;

            const args = [];

            operation = collection.getOperation(opCode);

            calledOp += ` ${operation.label}`;

            if (this.calledOps.indexOf(calledOp) < 0) {
                this.calledOps.push(calledOp);
            }

            for (let i = 0; i < operation.numArgs; i++) {
                args[i] = this.mmu.getByte(this.registers.pc++);
            }

            //console.log(`${pc}: ${operation.label}   ${args.map((arg) => arg.toString(16)).join(' ')}`);

            const result = operation.callback(this.registers, this.mmu, args);

            if (Array.isArray(operation.cycles)) {
                this.cycles += operation.cycles[result ? 1 : 0];
            } else {
                this.cycles += operation.cycles;
            }

            this.ppu.update(this.cycles);


            // console.log('  ' + this.registers.dump());
            // console.log(`${Math.floor(this.cycles / 114)} cycles`);
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
            //console.log(`Called ops:\n${this.calledOps.join('\n')}`);
            process.exit(1);
        }
    }
};
