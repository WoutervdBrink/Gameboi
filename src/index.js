const Cpu = require('./cpu/cpu');

const config = require('./config');

const cpu = new Cpu(config.cpu);

while (true) {
    cpu.runOp();
}
