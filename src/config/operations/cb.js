const OperationCollection = require('../../cpu/operationcollection');

const functions = require('../../cpu/functions');

const cb = new OperationCollection();

const {toWord} = require('../../util');

cb.defineOperation(0x00, 2, 0, 'RLC B', (r, m, a) => {r.b = functions.rotateLeft(r, r.b)});
cb.defineOperation(0x01, 2, 0, 'RLC C', (r, m, a) => {r.c = functions.rotateLeft(r, r.c)});
cb.defineOperation(0x02, 2, 0, 'RLC D', (r, m, a) => {r.d = functions.rotateLeft(r, r.d)});
cb.defineOperation(0x03, 2, 0, 'RLC E', (r, m, a) => {r.e = functions.rotateLeft(r, r.e)});
cb.defineOperation(0x04, 2, 0, 'RLC H', (r, m, a) => {r.h = functions.rotateLeft(r, r.h)});
cb.defineOperation(0x05, 2, 0, 'RLC L', (r, m, a) => {r.l = functions.rotateLeft(r, r.l)});
cb.defineOperation(0x06, 4, 0, 'RLC (HL)', (r, m, a) => {m.setByte(r.hl, functions.rotateLeft(r, m.getByte(r.hl)))});
cb.defineOperation(0x07, 2, 0, 'RLC A', (r, m, a) => {r.a = functions.rotateLeft(r, r.a)});

cb.defineOperation(0x08, 2, 0, 'RRC B', (r, m, a) => {r.b = functions.rotateRight(r, r.b)});
cb.defineOperation(0x09, 2, 0, 'RRC C', (r, m, a) => {r.c = functions.rotateRight(r, r.c)});
cb.defineOperation(0x0a, 2, 0, 'RRC D', (r, m, a) => {r.d = functions.rotateRight(r, r.d)});
cb.defineOperation(0x0b, 2, 0, 'RRC E', (r, m, a) => {r.e = functions.rotateRight(r, r.e)});
cb.defineOperation(0x0c, 2, 0, 'RRC H', (r, m, a) => {r.h = functions.rotateRight(r, r.h)});
cb.defineOperation(0x0d, 2, 0, 'RRC L', (r, m, a) => {r.l = functions.rotateRight(r, r.l)});
cb.defineOperation(0x0e, 4, 0, 'RRC (HL)', (r, m, a) => {m.setByte(r.hl, functions.rotateRight(r, m.getByte(r.hl)))});
cb.defineOperation(0x0f, 2, 0, 'RRC A', (r, m, a) => {r.a = functions.rotateRight(r, r.a)});

cb.defineOperation(0x10, 2, 0, 'RL B', (r, m, a) => {r.b = functions.rotateLeftThroughCarry(r, r.b)});
cb.defineOperation(0x11, 2, 0, 'RL C', (r, m, a) => {r.c = functions.rotateLeftThroughCarry(r, r.c)});
cb.defineOperation(0x12, 2, 0, 'RL D', (r, m, a) => {r.d = functions.rotateLeftThroughCarry(r, r.d)});
cb.defineOperation(0x13, 2, 0, 'RL E', (r, m, a) => {r.e = functions.rotateLeftThroughCarry(r, r.e)});
cb.defineOperation(0x14, 2, 0, 'RL H', (r, m, a) => {r.h = functions.rotateLeftThroughCarry(r, r.h)});
cb.defineOperation(0x15, 2, 0, 'RL L', (r, m, a) => {r.l = functions.rotateLeftThroughCarry(r, r.l)});
cb.defineOperation(0x16, 4, 0, 'RL (HL)', (r, m, a) => {m.setByte(r.hl, functions.rotateLeftThroughCarry(r, m.getByte(r.hl)))});
cb.defineOperation(0x17, 2, 0, 'RL A', (r, m, a) => {r.a = functions.rotateLeftThroughCarry(r, r.a)});

cb.defineOperation(0x18, 2, 0, 'RR B', (r, m, a) => {r.b = functions.rotateRightThroughCarry(r, r.b)});
cb.defineOperation(0x19, 2, 0, 'RR C', (r, m, a) => {r.c = functions.rotateRightThroughCarry(r, r.c)});
cb.defineOperation(0x1a, 2, 0, 'RR D', (r, m, a) => {r.d = functions.rotateRightThroughCarry(r, r.d)});
cb.defineOperation(0x1b, 2, 0, 'RR E', (r, m, a) => {r.e = functions.rotateRightThroughCarry(r, r.e)});
cb.defineOperation(0x1c, 2, 0, 'RR H', (r, m, a) => {r.h = functions.rotateRightThroughCarry(r, r.h)});
cb.defineOperation(0x1d, 2, 0, 'RR L', (r, m, a) => {r.l = functions.rotateRightThroughCarry(r, r.l)});
cb.defineOperation(0x1e, 4, 0, 'RR (HL)', (r, m, a) => {m.setByte(r.hl, functions.rotateRightThroughCarry(r, m.getByte(r.hl)))});
cb.defineOperation(0x1f, 2, 0, 'RR A', (r, m, a) => {r.a = functions.rotateRightThroughCarry(r, r.a)});

cb.defineOperation(0x20, 2, 0, 'SLA B', (r, m, a) => {r.b = functions.shiftLeft(r, r.b)});
cb.defineOperation(0x21, 2, 0, 'SLA C', (r, m, a) => {r.c = functions.shiftLeft(r, r.c)});
cb.defineOperation(0x22, 2, 0, 'SLA D', (r, m, a) => {r.d = functions.shiftLeft(r, r.d)});
cb.defineOperation(0x23, 2, 0, 'SLA E', (r, m, a) => {r.e = functions.shiftLeft(r, r.e)});
cb.defineOperation(0x24, 2, 0, 'SLA H', (r, m, a) => {r.h = functions.shiftLeft(r, r.h)});
cb.defineOperation(0x25, 2, 0, 'SLA L', (r, m, a) => {r.l = functions.shiftLeft(r, r.l)});
cb.defineOperation(0x26, 4, 0, 'SLA (HL)', (r, m, a) => {m.setByte(r.hl, functions.shiftLeft(r, m.getByte(r.hl)))});
cb.defineOperation(0x27, 2, 0, 'SLA A', (r, m, a) => {r.a = functions.shiftLeft(r, r.a)});

cb.defineOperation(0x28, 2, 0, 'SRA B', (r, m, a) => {r.b = functions.shiftRightArithmetic(r, r.b)});
cb.defineOperation(0x29, 2, 0, 'SRA C', (r, m, a) => {r.c = functions.shiftRightArithmetic(r, r.c)});
cb.defineOperation(0x2a, 2, 0, 'SRA D', (r, m, a) => {r.d = functions.shiftRightArithmetic(r, r.d)});
cb.defineOperation(0x2b, 2, 0, 'SRA E', (r, m, a) => {r.e = functions.shiftRightArithmetic(r, r.e)});
cb.defineOperation(0x2c, 2, 0, 'SRA H', (r, m, a) => {r.h = functions.shiftRightArithmetic(r, r.h)});
cb.defineOperation(0x2d, 2, 0, 'SRA L', (r, m, a) => {r.l = functions.shiftRightArithmetic(r, r.l)});
cb.defineOperation(0x2e, 4, 0, 'SRA (HL)', (r, m, a) => {m.setByte(r.hl, functions.shiftRightArithmetic(r, m.getByte(r.hl)))});
cb.defineOperation(0x2f, 2, 0, 'SRA A', (r, m, a) => {r.a = functions.shiftRightArithmetic(r, r.a)});

cb.defineOperation(0x30, 2, 0, 'SWAP B', (r, m, a) => {r.b = functions.swap(r, r.b)});
cb.defineOperation(0x31, 2, 0, 'SWAP C', (r, m, a) => {r.c = functions.swap(r, r.c)});
cb.defineOperation(0x32, 2, 0, 'SWAP D', (r, m, a) => {r.d = functions.swap(r, r.d)});
cb.defineOperation(0x33, 2, 0, 'SWAP E', (r, m, a) => {r.e = functions.swap(r, r.e)});
cb.defineOperation(0x34, 2, 0, 'SWAP H', (r, m, a) => {r.h = functions.swap(r, r.h)});
cb.defineOperation(0x35, 2, 0, 'SWAP L', (r, m, a) => {r.l = functions.swap(r, r.l)});
cb.defineOperation(0x36, 4, 0, 'SWAP (HL)', (r, m, a) => {m.setByte(r.hl, functions.swap(r, m.getByte(r.hl)))});
cb.defineOperation(0x37, 2, 0, 'SWAP A', (r, m, a) => {r.a = functions.swap(r, r.a)});

cb.defineOperation(0x38, 2, 0, 'SRL B', (r, m, a) => {r.b = functions.shiftRightLogical(r, r.b)});
cb.defineOperation(0x39, 2, 0, 'SRL C', (r, m, a) => {r.c = functions.shiftRightLogical(r, r.c)});
cb.defineOperation(0x3a, 2, 0, 'SRL D', (r, m, a) => {r.d = functions.shiftRightLogical(r, r.d)});
cb.defineOperation(0x3b, 2, 0, 'SRL E', (r, m, a) => {r.e = functions.shiftRightLogical(r, r.e)});
cb.defineOperation(0x3c, 2, 0, 'SRL H', (r, m, a) => {r.h = functions.shiftRightLogical(r, r.h)});
cb.defineOperation(0x3d, 2, 0, 'SRL L', (r, m, a) => {r.l = functions.shiftRightLogical(r, r.l)});
cb.defineOperation(0x3e, 4, 0, 'SRL (HL)', (r, m, a) => {m.setByte(r.hl, functions.shiftRightLogical(r, m.getByte(r.hl)))});
cb.defineOperation(0x3f, 2, 0, 'SRL A', (r, m, a) => {r.a = functions.shiftRightLogical(r, r.a)});

cb.defineOperation(0x40, 2, 0, 'BIT 0, B', (r, m, a) => {functions.bit(r, r.b, 0)});
cb.defineOperation(0x41, 2, 0, 'BIT 0, C', (r, m, a) => {functions.bit(r, r.c, 0)});
cb.defineOperation(0x42, 2, 0, 'BIT 0, D', (r, m, a) => {functions.bit(r, r.d, 0)});
cb.defineOperation(0x43, 2, 0, 'BIT 0, E', (r, m, a) => {functions.bit(r, r.e, 0)});
cb.defineOperation(0x44, 2, 0, 'BIT 0, H', (r, m, a) => {functions.bit(r, r.h, 0)});
cb.defineOperation(0x45, 2, 0, 'BIT 0, L', (r, m, a) => {functions.bit(r, r.l, 0)});
cb.defineOperation(0x46, 4, 0, 'BIT 0, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 0)});
cb.defineOperation(0x47, 2, 0, 'BIT 0, A', (r, m, a) => {functions.bit(r, r.a, 0)});

cb.defineOperation(0x48, 2, 0, 'BIT 1, B', (r, m, a) => {functions.bit(r, r.b, 1)});
cb.defineOperation(0x49, 2, 0, 'BIT 1, C', (r, m, a) => {functions.bit(r, r.c, 1)});
cb.defineOperation(0x4a, 2, 0, 'BIT 1, D', (r, m, a) => {functions.bit(r, r.d, 1)});
cb.defineOperation(0x4b, 2, 0, 'BIT 1, E', (r, m, a) => {functions.bit(r, r.e, 1)});
cb.defineOperation(0x4c, 2, 0, 'BIT 1, H', (r, m, a) => {functions.bit(r, r.h, 1)});
cb.defineOperation(0x4d, 2, 0, 'BIT 1, L', (r, m, a) => {functions.bit(r, r.l, 1)});
cb.defineOperation(0x4e, 4, 0, 'BIT 1, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 1)});
cb.defineOperation(0x4f, 2, 0, 'BIT 1, A', (r, m, a) => {functions.bit(r, r.a, 1)});

cb.defineOperation(0x50, 2, 0, 'BIT 2, B', (r, m, a) => {functions.bit(r, r.b, 2)});
cb.defineOperation(0x51, 2, 0, 'BIT 2, C', (r, m, a) => {functions.bit(r, r.c, 2)});
cb.defineOperation(0x52, 2, 0, 'BIT 2, D', (r, m, a) => {functions.bit(r, r.d, 2)});
cb.defineOperation(0x53, 2, 0, 'BIT 2, E', (r, m, a) => {functions.bit(r, r.e, 2)});
cb.defineOperation(0x54, 2, 0, 'BIT 2, H', (r, m, a) => {functions.bit(r, r.h, 2)});
cb.defineOperation(0x55, 2, 0, 'BIT 2, L', (r, m, a) => {functions.bit(r, r.l, 2)});
cb.defineOperation(0x56, 4, 0, 'BIT 2, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 2)});
cb.defineOperation(0x57, 2, 0, 'BIT 2, A', (r, m, a) => {functions.bit(r, r.a, 2)});

cb.defineOperation(0x58, 2, 0, 'BIT 3, B', (r, m, a) => {functions.bit(r, r.b, 3)});
cb.defineOperation(0x59, 2, 0, 'BIT 3, C', (r, m, a) => {functions.bit(r, r.c, 3)});
cb.defineOperation(0x5a, 2, 0, 'BIT 3, D', (r, m, a) => {functions.bit(r, r.d, 3)});
cb.defineOperation(0x5b, 2, 0, 'BIT 3, E', (r, m, a) => {functions.bit(r, r.e, 3)});
cb.defineOperation(0x5c, 2, 0, 'BIT 3, H', (r, m, a) => {functions.bit(r, r.h, 3)});
cb.defineOperation(0x5d, 2, 0, 'BIT 3, L', (r, m, a) => {functions.bit(r, r.l, 3)});
cb.defineOperation(0x5e, 4, 0, 'BIT 3, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 3)});
cb.defineOperation(0x5f, 2, 0, 'BIT 3, A', (r, m, a) => {functions.bit(r, r.a, 3)});

cb.defineOperation(0x60, 2, 0, 'BIT 4, B', (r, m, a) => {functions.bit(r, r.b, 4)});
cb.defineOperation(0x61, 2, 0, 'BIT 4, C', (r, m, a) => {functions.bit(r, r.c, 4)});
cb.defineOperation(0x62, 2, 0, 'BIT 4, D', (r, m, a) => {functions.bit(r, r.d, 4)});
cb.defineOperation(0x63, 2, 0, 'BIT 4, E', (r, m, a) => {functions.bit(r, r.e, 4)});
cb.defineOperation(0x64, 2, 0, 'BIT 4, H', (r, m, a) => {functions.bit(r, r.h, 4)});
cb.defineOperation(0x65, 2, 0, 'BIT 4, L', (r, m, a) => {functions.bit(r, r.l, 4)});
cb.defineOperation(0x66, 4, 0, 'BIT 4, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 4)});
cb.defineOperation(0x67, 2, 0, 'BIT 4, A', (r, m, a) => {functions.bit(r, r.a, 4)});

cb.defineOperation(0x68, 2, 0, 'BIT 5, B', (r, m, a) => {functions.bit(r, r.b, 5)});
cb.defineOperation(0x69, 2, 0, 'BIT 5, C', (r, m, a) => {functions.bit(r, r.c, 5)});
cb.defineOperation(0x6a, 2, 0, 'BIT 5, D', (r, m, a) => {functions.bit(r, r.d, 5)});
cb.defineOperation(0x6b, 2, 0, 'BIT 5, E', (r, m, a) => {functions.bit(r, r.e, 5)});
cb.defineOperation(0x6c, 2, 0, 'BIT 5, H', (r, m, a) => {functions.bit(r, r.h, 5)});
cb.defineOperation(0x6d, 2, 0, 'BIT 5, L', (r, m, a) => {functions.bit(r, r.l, 5)});
cb.defineOperation(0x6e, 4, 0, 'BIT 5, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 5)});
cb.defineOperation(0x6f, 2, 0, 'BIT 5, A', (r, m, a) => {functions.bit(r, r.a, 5)});

cb.defineOperation(0x70, 2, 0, 'BIT 6, B', (r, m, a) => {functions.bit(r, r.b, 6)});
cb.defineOperation(0x71, 2, 0, 'BIT 6, C', (r, m, a) => {functions.bit(r, r.c, 6)});
cb.defineOperation(0x72, 2, 0, 'BIT 6, D', (r, m, a) => {functions.bit(r, r.d, 6)});
cb.defineOperation(0x73, 2, 0, 'BIT 6, E', (r, m, a) => {functions.bit(r, r.e, 6)});
cb.defineOperation(0x74, 2, 0, 'BIT 6, H', (r, m, a) => {functions.bit(r, r.h, 6)});
cb.defineOperation(0x75, 2, 0, 'BIT 6, L', (r, m, a) => {functions.bit(r, r.l, 6)});
cb.defineOperation(0x76, 4, 0, 'BIT 6, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 6)});
cb.defineOperation(0x77, 2, 0, 'BIT 6, A', (r, m, a) => {functions.bit(r, r.a, 6)});

cb.defineOperation(0x78, 2, 0, 'BIT 7, B', (r, m, a) => {functions.bit(r, r.b, 7)});
cb.defineOperation(0x79, 2, 0, 'BIT 7, C', (r, m, a) => {functions.bit(r, r.c, 7)});
cb.defineOperation(0x7a, 2, 0, 'BIT 7, D', (r, m, a) => {functions.bit(r, r.d, 7)});
cb.defineOperation(0x7b, 2, 0, 'BIT 7, E', (r, m, a) => {functions.bit(r, r.e, 7)});
cb.defineOperation(0x7c, 2, 0, 'BIT 7, H', (r, m, a) => {functions.bit(r, r.h, 7)});
cb.defineOperation(0x7d, 2, 0, 'BIT 7, L', (r, m, a) => {functions.bit(r, r.l, 7)});
cb.defineOperation(0x7e, 4, 0, 'BIT 7, (HL)', (r, m, a) => {functions.bit(r, m.getByte(r.hl), 7)});
cb.defineOperation(0x7f, 2, 0, 'BIT 7, A', (r, m, a) => {functions.bit(r, r.a, 7)});

cb.defineOperation(0x80, 2, 0, 'RES 0, B', (r, m, a) => {r.b = functions.setBit(r.b, 0, 0)});
cb.defineOperation(0x81, 2, 0, 'RES 0, C', (r, m, a) => {r.c = functions.setBit(r.c, 0, 0)});
cb.defineOperation(0x82, 2, 0, 'RES 0, D', (r, m, a) => {r.d = functions.setBit(r.d, 0, 0)});
cb.defineOperation(0x83, 2, 0, 'RES 0, E', (r, m, a) => {r.e = functions.setBit(r.e, 0, 0)});
cb.defineOperation(0x84, 2, 0, 'RES 0, H', (r, m, a) => {r.h = functions.setBit(r.h, 0, 0)});
cb.defineOperation(0x85, 2, 0, 'RES 0, L', (r, m, a) => {r.l = functions.setBit(r.l, 0, 0)});
cb.defineOperation(0x86, 4, 0, 'RES 0, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 0, 0))});
cb.defineOperation(0x87, 2, 0, 'RES 0, A', (r, m, a) => {r.a = functions.setBit(r.a, 0, 0)});

cb.defineOperation(0x88, 2, 0, 'RES 1, B', (r, m, a) => {r.b = functions.setBit(r.b, 1, 0)});
cb.defineOperation(0x89, 2, 0, 'RES 1, C', (r, m, a) => {r.c = functions.setBit(r.c, 1, 0)});
cb.defineOperation(0x8a, 2, 0, 'RES 1, D', (r, m, a) => {r.d = functions.setBit(r.d, 1, 0)});
cb.defineOperation(0x8b, 2, 0, 'RES 1, E', (r, m, a) => {r.e = functions.setBit(r.e, 1, 0)});
cb.defineOperation(0x8c, 2, 0, 'RES 1, H', (r, m, a) => {r.h = functions.setBit(r.h, 1, 0)});
cb.defineOperation(0x8d, 2, 0, 'RES 1, L', (r, m, a) => {r.l = functions.setBit(r.l, 1, 0)});
cb.defineOperation(0x8e, 4, 0, 'RES 1, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 1, 0))});
cb.defineOperation(0x8f, 2, 0, 'RES 1, A', (r, m, a) => {r.a = functions.setBit(r.a, 1, 0)});

cb.defineOperation(0x90, 2, 0, 'RES 2, B', (r, m, a) => {r.b = functions.setBit(r.b, 2, 0)});
cb.defineOperation(0x91, 2, 0, 'RES 2, C', (r, m, a) => {r.c = functions.setBit(r.c, 2, 0)});
cb.defineOperation(0x92, 2, 0, 'RES 2, D', (r, m, a) => {r.d = functions.setBit(r.d, 2, 0)});
cb.defineOperation(0x93, 2, 0, 'RES 2, E', (r, m, a) => {r.e = functions.setBit(r.e, 2, 0)});
cb.defineOperation(0x94, 2, 0, 'RES 2, H', (r, m, a) => {r.h = functions.setBit(r.h, 2, 0)});
cb.defineOperation(0x95, 2, 0, 'RES 2, L', (r, m, a) => {r.l = functions.setBit(r.l, 2, 0)});
cb.defineOperation(0x96, 4, 0, 'RES 2, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 2, 0))});
cb.defineOperation(0x97, 2, 0, 'RES 2, A', (r, m, a) => {r.a = functions.setBit(r.a, 2, 0)});

cb.defineOperation(0x98, 2, 0, 'RES 3, B', (r, m, a) => {r.b = functions.setBit(r.b, 3, 0)});
cb.defineOperation(0x99, 2, 0, 'RES 3, C', (r, m, a) => {r.c = functions.setBit(r.c, 3, 0)});
cb.defineOperation(0x9a, 2, 0, 'RES 3, D', (r, m, a) => {r.d = functions.setBit(r.d, 3, 0)});
cb.defineOperation(0x9b, 2, 0, 'RES 3, E', (r, m, a) => {r.e = functions.setBit(r.e, 3, 0)});
cb.defineOperation(0x9c, 2, 0, 'RES 3, H', (r, m, a) => {r.h = functions.setBit(r.h, 3, 0)});
cb.defineOperation(0x9d, 2, 0, 'RES 3, L', (r, m, a) => {r.l = functions.setBit(r.l, 3, 0)});
cb.defineOperation(0x9e, 4, 0, 'RES 3, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 3, 0))});
cb.defineOperation(0x9f, 2, 0, 'RES 3, A', (r, m, a) => {r.a = functions.setBit(r.a, 3, 0)});

cb.defineOperation(0xa0, 2, 0, 'RES 4, B', (r, m, a) => {r.b = functions.setBit(r.b, 4, 0)});
cb.defineOperation(0xa1, 2, 0, 'RES 4, C', (r, m, a) => {r.c = functions.setBit(r.c, 4, 0)});
cb.defineOperation(0xa2, 2, 0, 'RES 4, D', (r, m, a) => {r.d = functions.setBit(r.d, 4, 0)});
cb.defineOperation(0xa3, 2, 0, 'RES 4, E', (r, m, a) => {r.e = functions.setBit(r.e, 4, 0)});
cb.defineOperation(0xa4, 2, 0, 'RES 4, H', (r, m, a) => {r.h = functions.setBit(r.h, 4, 0)});
cb.defineOperation(0xa5, 2, 0, 'RES 4, L', (r, m, a) => {r.l = functions.setBit(r.l, 4, 0)});
cb.defineOperation(0xa6, 4, 0, 'RES 4, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 4, 0))});
cb.defineOperation(0xa7, 2, 0, 'RES 4, A', (r, m, a) => {r.a = functions.setBit(r.a, 4, 0)});

cb.defineOperation(0xa8, 2, 0, 'RES 5, B', (r, m, a) => {r.b = functions.setBit(r.b, 5, 0)});
cb.defineOperation(0xa9, 2, 0, 'RES 5, C', (r, m, a) => {r.c = functions.setBit(r.c, 5, 0)});
cb.defineOperation(0xaa, 2, 0, 'RES 5, D', (r, m, a) => {r.d = functions.setBit(r.d, 5, 0)});
cb.defineOperation(0xab, 2, 0, 'RES 5, E', (r, m, a) => {r.e = functions.setBit(r.e, 5, 0)});
cb.defineOperation(0xac, 2, 0, 'RES 5, H', (r, m, a) => {r.h = functions.setBit(r.h, 5, 0)});
cb.defineOperation(0xad, 2, 0, 'RES 5, L', (r, m, a) => {r.l = functions.setBit(r.l, 5, 0)});
cb.defineOperation(0xae, 4, 0, 'RES 5, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 5, 0))});
cb.defineOperation(0xaf, 2, 0, 'RES 5, A', (r, m, a) => {r.a = functions.setBit(r.a, 5, 0)});

cb.defineOperation(0xb0, 2, 0, 'RES 6, B', (r, m, a) => {r.b = functions.setBit(r.b, 6, 0)});
cb.defineOperation(0xb1, 2, 0, 'RES 6, C', (r, m, a) => {r.c = functions.setBit(r.c, 6, 0)});
cb.defineOperation(0xb2, 2, 0, 'RES 6, D', (r, m, a) => {r.d = functions.setBit(r.d, 6, 0)});
cb.defineOperation(0xb3, 2, 0, 'RES 6, E', (r, m, a) => {r.e = functions.setBit(r.e, 6, 0)});
cb.defineOperation(0xb4, 2, 0, 'RES 6, H', (r, m, a) => {r.h = functions.setBit(r.h, 6, 0)});
cb.defineOperation(0xb5, 2, 0, 'RES 6, L', (r, m, a) => {r.l = functions.setBit(r.l, 6, 0)});
cb.defineOperation(0xb6, 4, 0, 'RES 6, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 6, 0))});
cb.defineOperation(0xb7, 2, 0, 'RES 6, A', (r, m, a) => {r.a = functions.setBit(r.a, 6, 0)});

cb.defineOperation(0xb8, 2, 0, 'RES 7, B', (r, m, a) => {r.b = functions.setBit(r.b, 7, 0)});
cb.defineOperation(0xb9, 2, 0, 'RES 7, C', (r, m, a) => {r.c = functions.setBit(r.c, 7, 0)});
cb.defineOperation(0xba, 2, 0, 'RES 7, D', (r, m, a) => {r.d = functions.setBit(r.d, 7, 0)});
cb.defineOperation(0xbb, 2, 0, 'RES 7, E', (r, m, a) => {r.e = functions.setBit(r.e, 7, 0)});
cb.defineOperation(0xbc, 2, 0, 'RES 7, H', (r, m, a) => {r.h = functions.setBit(r.h, 7, 0)});
cb.defineOperation(0xbd, 2, 0, 'RES 7, L', (r, m, a) => {r.l = functions.setBit(r.l, 7, 0)});
cb.defineOperation(0xbe, 4, 0, 'RES 7, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 7, 0))});
cb.defineOperation(0xbf, 2, 0, 'RES 7, A', (r, m, a) => {r.a = functions.setBit(r.a, 7, 0)});

cb.defineOperation(0xc0, 2, 0, 'SET 0, B', (r, m, a) => {r.b = functions.setBit(r.b, 0, 1)});
cb.defineOperation(0xc1, 2, 0, 'SET 0, C', (r, m, a) => {r.c = functions.setBit(r.c, 0, 1)});
cb.defineOperation(0xc2, 2, 0, 'SET 0, D', (r, m, a) => {r.d = functions.setBit(r.d, 0, 1)});
cb.defineOperation(0xc3, 2, 0, 'SET 0, E', (r, m, a) => {r.e = functions.setBit(r.e, 0, 1)});
cb.defineOperation(0xc4, 2, 0, 'SET 0, H', (r, m, a) => {r.h = functions.setBit(r.h, 0, 1)});
cb.defineOperation(0xc5, 2, 0, 'SET 0, L', (r, m, a) => {r.l = functions.setBit(r.l, 0, 1)});
cb.defineOperation(0xc6, 4, 0, 'SET 0, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 0, 1))});
cb.defineOperation(0xc7, 2, 0, 'SET 0, A', (r, m, a) => {r.a = functions.setBit(r.a, 0, 1)});

cb.defineOperation(0xc8, 2, 0, 'SET 1, B', (r, m, a) => {r.b = functions.setBit(r.b, 1, 1)});
cb.defineOperation(0xc9, 2, 0, 'SET 1, C', (r, m, a) => {r.c = functions.setBit(r.c, 1, 1)});
cb.defineOperation(0xca, 2, 0, 'SET 1, D', (r, m, a) => {r.d = functions.setBit(r.d, 1, 1)});
cb.defineOperation(0xcb, 2, 0, 'SET 1, E', (r, m, a) => {r.e = functions.setBit(r.e, 1, 1)});
cb.defineOperation(0xcc, 2, 0, 'SET 1, H', (r, m, a) => {r.h = functions.setBit(r.h, 1, 1)});
cb.defineOperation(0xcd, 2, 0, 'SET 1, L', (r, m, a) => {r.l = functions.setBit(r.l, 1, 1)});
cb.defineOperation(0xce, 4, 0, 'SET 1, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 1, 1))});
cb.defineOperation(0xcf, 2, 0, 'SET 1, A', (r, m, a) => {r.a = functions.setBit(r.a, 1, 1)});

cb.defineOperation(0xd0, 2, 0, 'SET 2, B', (r, m, a) => {r.b = functions.setBit(r.b, 2, 1)});
cb.defineOperation(0xd1, 2, 0, 'SET 2, C', (r, m, a) => {r.c = functions.setBit(r.c, 2, 1)});
cb.defineOperation(0xd2, 2, 0, 'SET 2, D', (r, m, a) => {r.d = functions.setBit(r.d, 2, 1)});
cb.defineOperation(0xd3, 2, 0, 'SET 2, E', (r, m, a) => {r.e = functions.setBit(r.e, 2, 1)});
cb.defineOperation(0xd4, 2, 0, 'SET 2, H', (r, m, a) => {r.h = functions.setBit(r.h, 2, 1)});
cb.defineOperation(0xd5, 2, 0, 'SET 2, L', (r, m, a) => {r.l = functions.setBit(r.l, 2, 1)});
cb.defineOperation(0xd6, 4, 0, 'SET 2, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 2, 1))});
cb.defineOperation(0xd7, 2, 0, 'SET 2, A', (r, m, a) => {r.a = functions.setBit(r.a, 2, 1)});

cb.defineOperation(0xd8, 2, 0, 'SET 3, B', (r, m, a) => {r.b = functions.setBit(r.b, 3, 1)});
cb.defineOperation(0xd9, 2, 0, 'SET 3, C', (r, m, a) => {r.c = functions.setBit(r.c, 3, 1)});
cb.defineOperation(0xda, 2, 0, 'SET 3, D', (r, m, a) => {r.d = functions.setBit(r.d, 3, 1)});
cb.defineOperation(0xdb, 2, 0, 'SET 3, E', (r, m, a) => {r.e = functions.setBit(r.e, 3, 1)});
cb.defineOperation(0xdc, 2, 0, 'SET 3, H', (r, m, a) => {r.h = functions.setBit(r.h, 3, 1)});
cb.defineOperation(0xdd, 2, 0, 'SET 3, L', (r, m, a) => {r.l = functions.setBit(r.l, 3, 1)});
cb.defineOperation(0xde, 4, 0, 'SET 3, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 3, 1))});
cb.defineOperation(0xdf, 2, 0, 'SET 3, A', (r, m, a) => {r.a = functions.setBit(r.a, 3, 1)});

cb.defineOperation(0xe0, 2, 0, 'SET 4, B', (r, m, a) => {r.b = functions.setBit(r.b, 4, 1)});
cb.defineOperation(0xe1, 2, 0, 'SET 4, C', (r, m, a) => {r.c = functions.setBit(r.c, 4, 1)});
cb.defineOperation(0xe2, 2, 0, 'SET 4, D', (r, m, a) => {r.d = functions.setBit(r.d, 4, 1)});
cb.defineOperation(0xe3, 2, 0, 'SET 4, E', (r, m, a) => {r.e = functions.setBit(r.e, 4, 1)});
cb.defineOperation(0xe4, 2, 0, 'SET 4, H', (r, m, a) => {r.h = functions.setBit(r.h, 4, 1)});
cb.defineOperation(0xe5, 2, 0, 'SET 4, L', (r, m, a) => {r.l = functions.setBit(r.l, 4, 1)});
cb.defineOperation(0xe6, 4, 0, 'SET 4, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 4, 1))});
cb.defineOperation(0xe7, 2, 0, 'SET 4, A', (r, m, a) => {r.a = functions.setBit(r.a, 4, 1)});

cb.defineOperation(0xe8, 2, 0, 'SET 5, B', (r, m, a) => {r.b = functions.setBit(r.b, 5, 1)});
cb.defineOperation(0xe9, 2, 0, 'SET 5, C', (r, m, a) => {r.c = functions.setBit(r.c, 5, 1)});
cb.defineOperation(0xea, 2, 0, 'SET 5, D', (r, m, a) => {r.d = functions.setBit(r.d, 5, 1)});
cb.defineOperation(0xeb, 2, 0, 'SET 5, E', (r, m, a) => {r.e = functions.setBit(r.e, 5, 1)});
cb.defineOperation(0xec, 2, 0, 'SET 5, H', (r, m, a) => {r.h = functions.setBit(r.h, 5, 1)});
cb.defineOperation(0xed, 2, 0, 'SET 5, L', (r, m, a) => {r.l = functions.setBit(r.l, 5, 1)});
cb.defineOperation(0xee, 4, 0, 'SET 5, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 5, 1))});
cb.defineOperation(0xef, 2, 0, 'SET 5, A', (r, m, a) => {r.a = functions.setBit(r.a, 5, 1)});

cb.defineOperation(0xf0, 2, 0, 'SET 6, B', (r, m, a) => {r.b = functions.setBit(r.b, 6, 1)});
cb.defineOperation(0xf1, 2, 0, 'SET 6, C', (r, m, a) => {r.c = functions.setBit(r.c, 6, 1)});
cb.defineOperation(0xf2, 2, 0, 'SET 6, D', (r, m, a) => {r.d = functions.setBit(r.d, 6, 1)});
cb.defineOperation(0xf3, 2, 0, 'SET 6, E', (r, m, a) => {r.e = functions.setBit(r.e, 6, 1)});
cb.defineOperation(0xf4, 2, 0, 'SET 6, H', (r, m, a) => {r.h = functions.setBit(r.h, 6, 1)});
cb.defineOperation(0xf5, 2, 0, 'SET 6, L', (r, m, a) => {r.l = functions.setBit(r.l, 6, 1)});
cb.defineOperation(0xf6, 4, 0, 'SET 6, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 6, 1))});
cb.defineOperation(0xf7, 2, 0, 'SET 6, A', (r, m, a) => {r.a = functions.setBit(r.a, 6, 1)});

cb.defineOperation(0xf8, 2, 0, 'SET 7, B', (r, m, a) => {r.b = functions.setBit(r.b, 7, 1)});
cb.defineOperation(0xf9, 2, 0, 'SET 7, C', (r, m, a) => {r.c = functions.setBit(r.c, 7, 1)});
cb.defineOperation(0xfa, 2, 0, 'SET 7, D', (r, m, a) => {r.d = functions.setBit(r.d, 7, 1)});
cb.defineOperation(0xfb, 2, 0, 'SET 7, E', (r, m, a) => {r.e = functions.setBit(r.e, 7, 1)});
cb.defineOperation(0xfc, 2, 0, 'SET 7, H', (r, m, a) => {r.h = functions.setBit(r.h, 7, 1)});
cb.defineOperation(0xfd, 2, 0, 'SET 7, L', (r, m, a) => {r.l = functions.setBit(r.l, 7, 1)});
cb.defineOperation(0xfe, 4, 0, 'SET 7, (HL)', (r, m, a) => {m.setByte(r.hl, functions.setBit(m.getByte(r.hl), 7, 1))});
cb.defineOperation(0xff, 2, 0, 'SET 7, A', (r, m, a) => {r.a = functions.setBit(r.a, 7, 1)});

module.exports = cb;
