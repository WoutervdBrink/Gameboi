const {sleep} = require('./util');

module.exports = class Debugger {
    constructor(cpu) {
        this._cpu = cpu;

        this._running = false;
        this._dump = false;

        this._enteringText = false;

        this._breakpoints = [];
    }

    _formatByte(b) {
        const s = b.toString(16);
        return s.length === 2 ? s : `0${s}`;
    }

    async _getText(prompt = null) {
        if (this._enteringText) {
            throw new Error('Awaiting text while already awaiting text!');
        }

        if (prompt) {
            console.log(prompt);
        }

        process.stdin.setRawMode(false);
        this._enteringText = true;

        return new Promise((resolve) => {
            process.stdin.once('data', (data) => {
                this._enteringText = false;
                process.stdin.setRawMode(true);
                resolve(data.toString().trim());
            });
        });
    }

    async _getHex(prompt = null) {
        const string = await this._getText(prompt);

        return Number(`0x${string}`);
    }

    _showHelp() {
        console.log([
            'h: help',
            'd: enable / disable dumping',
            'r: start / stop',
            'q: quit (or ctrl+C or ctrl+D)',
            'b: add / remove breakpoint',
            'm: dump memory',
            'l: list breakpoints'
        ].join('\n'));
    }

    _toggleRunning() {
        this._running = !this._running;
        console.log(`${this._running ? 'Started' : 'Paused'} execution.`);
        if (this._running) {
            this.run();
        }
    }

    _toggleDump() {
        this._dump = !this._dump;
        console.log(`${this._dump ? 'Enabled' : 'Disabled'} dumping.`);
    }

    async _editBreakpoints() {
        const address = await this._getHex('Enter breakpoint to add or remove:');

        if (address === NaN) {
            return console.log('Invalid breakpoint. Enter a hexadecimal address.');
        }

        if (this._breakpoints.indexOf(address) < 0) {
            this._breakpoints.push(address);
            console.log(`Added breakpoint at $${address.toString(16)}.`);
        } else {
            this._breakpoints = this._breakpoints.filter((b) => b !== address);
            console.log(`Removed breakpoint $${address.toString(16)}.`);
        }
    }

    async _dumpMemory() {
        const address = await this._getHex('Enter memory address to dump:');

        if (address === NaN) {
            return console.log('Invalid address. Enter a hexadecimal address.');
        }

        try {
            let s = '';

            for (let i = address; i < address + 16; i++) {
                s += this._formatByte(this._cpu.mmu.getByte(i)) + ' ';
            }

            console.log(`Memory at $${address.toString(16)}: ${s}`);
        } catch (e) {
            console.error(e.message);
        }
    }

    async _showBreakpoints() {
        if (this._breakpoints.length) {
            return console.log(`Current breakpoints: ${this._breakpoints.map((breakpoint) => breakpoint.toString(16)).join(', ')}`);
        }

        console.log('There are no breakpoints.');
    }

    async _runStep() {
        if (!this._running) {
            this._dump = true;
            this._runOp();
            this._dump = false;
        }
    }

    async _onStdinData(data) {
        if (this._enteringText) {
            return;
        }

        switch (data.toString()) {
            case String.fromCharCode(0x03): // CTRL+C
            case String.fromCharCode(0x04): // CTRL+D
                process.exit(1);
                break;
            case 'q':
                process.exit(0);
                break;
            case 'h':
                this._showHelp();
                break;
            case 'r':
                this._toggleRunning();
                break;
            case 'm':
                this._dumpMemory();
                break;
            case 'd':
                this._toggleDump();
                break;
            case 'b':
                this._editBreakpoints();
                break;
            case 'l':
                this._showBreakpoints();
                break;
            case String.fromCharCode(0x0d): // Return
                this._runStep();
                break;
        }
    }

    _runOp() {
        const {args, operation, pc, pcRaw} = this._cpu.runOp();

        if (this._breakpoints.indexOf(pcRaw) >= 0) {
            console.log(`!! Hit breakpoint ${pcRaw.toString(16)}. Pausing execution and enabling dump.`);
            this._running = false;
            this._dump = true;
        }

        if (this._dump) {
            console.log(`${pc}: ${operation.label}   ${args.map((arg) => arg.toString(16)).join(' ')}`);
            console.log('  ' + this._cpu.registers.dump());
            console.log(`  ${this._cpu.cycles} cycles`);
        }
    }

    async run() {
        if (this._running) {
            this._runOp();
            setImmediate(this.run.bind(this));
        }
    }

    start() {
        process.stdin.setRawMode(true);
        process.stdin.on('data', this._onStdinData.bind(this));
    }
}
