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
    }

    runOp() {
        let operation;

        let pcRaw = this.registers.pc;
        let pc = this.registers.pc.toString(16);

        const args = [];

        let collection = this.operations;

        try {
            let opCode = this.mmu.getByte(this.registers.pc++);

            if (typeof opCode === 'undefined') {
                console.error(`opCode from ${pc} was undefined!`);
                process.exit(1);
            }

            if (opCode === 0xCB) {
                pc += ' ' + this.registers.pc.toString(16);

                opCode = this.mmu.getByte(this.registers.pc++);

                collection = this.cbOperations;
            }

            operation = collection.getOperation(opCode);

            for (let i = 0; i < operation.numArgs; i++) {
                args[i] = this.mmu.getByte(this.registers.pc++);
            }

            const result = operation.callback(this.registers, this.mmu, args);

            if (Array.isArray(operation.cycles)) {
                this.cycles += operation.cycles[result ? 1 : 0];
            } else {
                this.cycles += operation.cycles;
            }

            this.ppu.update(this.cycles);

            return {operation, args, pc, pcRaw};
        } catch (e) {
            console.error(e);

            let mem = '';

            for (let i = 0; i < 10; i++) {
                mem += this.mmu.getByte(this.registers.pc++).toString(16) + ' ';
            }
            console.log(`${pc}: ${operation.label}   ${args.map((arg) => arg.toString(16)).join(' ')}`);
            console.log(`Memory following: ${mem}`);
            console.log('  ' + this.registers.dump());
            process.exit(1);
        }
    }
};
