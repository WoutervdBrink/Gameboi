const OperationCollection = require('../../cpu/operationcollection');

const functions = require('../../cpu/functions');

const regular = new OperationCollection();

const {toWord} = require('../../util');

const TODO = () => { throw new Error('TODO');};

regular.defineOperation(0x00, 1, 0, 'NOP', (r, m, a) => {});

regular.defineOperation(0x01, 3, 2, 'LD (BC), nn', (r, m, a) => {r.bc = toWord(a)});
regular.defineOperation(0x02, 3, 0, 'LD (BC), A', (r, m, a) => {m.setByte(r.bc, a)});

regular.defineOperation(0x03, 2, 0, 'INC BC', (r, m, a) => {r.bc = (r.bc + 1) & 0xFFFF});
regular.defineOperation(0x04, 1, 0, 'INC B', (r, m, a) => {r.b = functions.inc(r, r.b)});
regular.defineOperation(0x05, 1, 0, 'DEC B', (r, m, a) => {r.b = functions.dec(r, r.b)});

regular.defineOperation(0x06, 2, 1, 'LD B, n', (r, m, a) => {r.b = a[0]});
regular.defineOperation(0x07, 1, 0, 'RLCA', (r, m, a) => {r.a = functions.rotateLeft(r, r.a)});

regular.defineOperation(0x08, 5, 2, 'LD (nn), SP', (r, m, a) => {m.setByte(toWord(a), r.sp)});
regular.defineOperation(0x09, 2, 0, 'ADD HL, BC', (r, m, a) => {functions.addWords(r, r.hl, r.bc)});

regular.defineOperation(0x0a, 2, 0, 'LD A, (BC)', (r, m, a) => {r.a = m.getByte(r.bc)});

regular.defineOperation(0x0b, 2, 0, 'DEC BC', (r, m, a) => {r.bc = (r.bc - 1) & 0xFFFF});

regular.defineOperation(0x0c, 1, 0, 'INC C', (r, m, a) => {r.c = functions.inc(r, r.c)});
regular.defineOperation(0x0d, 1, 0, 'DEC C', (r, m, a) => {r.c = functions.dec(r, r.c)});

regular.defineOperation(0x0e, 2, 1, 'LD C, n', (r, m, a) => {r.c = a[0]});

regular.defineOperation(0x0f, 1, 0, 'RRCA', (r, m, a) => {r.a = functions.rotateRight(r, r.a)});

regular.defineOperation(0x10, 1, 1, 'STOP 0', TODO);

regular.defineOperation(0x11, 3, 2, 'LD DE, nn', (r, m, a) => {r.de = toWord(a)});

regular.defineOperation(0x12, 2, 1, 'LD (DE), A', (r, m, a) => {m.setByte(r.de, r.a)});

regular.defineOperation(0x13, 2, 1, 'INC DE', (r, m, a) => {r.de = (r.de + 1) & 0xFFFF});

regular.defineOperation(0x14, 1, 0, 'INC D', (r, m, a) => {r.d = functions.inc(r, r.d)});
regular.defineOperation(0x15, 1, 0, 'DEC D', (r, m, a) => {r.d = functions.dec(r, r.d)});

regular.defineOperation(0x16, 2, 1, 'LD D, n', (r, m, a) => {r.d = a[0]});

regular.defineOperation(0x17, 1, 0, 'RLA', (r, m, a) => {r.a = functions.rotateLeftThroughCarry(r, r.a)});

regular.defineOperation(0x18, 3, 1, 'JR n', (r, m, a) => {r.addToPC(a[0])});

regular.defineOperation(0x19, 2, 0, 'ADD HL, DE', (r, m, a) => {r.hl = functions.addWords(r.hl, r.de)});

regular.defineOperation(0x1a, 2, 0, 'LD A, (DE)', (r, m, a) => {r.a = m.getByte(r.de)});

regular.defineOperation(0x1b, 2, 0, 'DEC DE', (r, m, a) => {r.de = (r.de - 1) & 0xFFFF});

regular.defineOperation(0x1c, 1, 0, 'INC E', (r, m, a) => {r.e = functions.inc(r, r.e)});

regular.defineOperation(0x1d, 1, 0, 'DEC E', (r, m, a) => {r.e = functions.dec(r, r.e)});

regular.defineOperation(0x1e, 2, 1, 'LD E, n', (r, m, a) => {r.e = a[0]});

regular.defineOperation(0x1f, 1, 0, 'RRA', (r, m, a) => {r.a = functions.rotateRightThroughCarry(r, r.a)});

regular.defineOperation(0x20, [3, 2], 1, 'JR NZ, n', (r, m, a) => {if (!r.f_z) {r.addToPC(a[0]); return true;} return false;});

regular.defineOperation(0x21, 3, 2, 'LD HL, nn', (r, m, a) => {r.hl = toWord(a)});
regular.defineOperation(0x22, 2, 0, 'LD (HL+), A', (r, m, a) => {m.setByte(r.incrementHL(), r.a)});
regular.defineOperation(0x23, 2, 0, 'INC HL', (r, m, a) => {r.hl = (r.hl + 1) & 0xFFFF});
regular.defineOperation(0x24, 1, 0, 'INC H', (r, m, a) => {r.h = functions.inc(r, r.h)});
regular.defineOperation(0x25, 1, 0, 'DEC (H)', (r, m, a) => {m.setByte(functions.dec(r, m.getByte(r.h)))});

regular.defineOperation(0x26, 2, 1, 'LD H, n', (r, m, a) => {r.h = a[0]});

regular.defineOperation(0x27, 1, 0, 'DAA', (r, m, a) => {
    let result = r.a;
    if (((result & 0x0F) > 9) || r.f_h) {
        result += 0x06;
    }
    if (((result & 0xF0) > 0x90) || r.f_c) {
        result += 0x60;
        r.f_c = 1;
    }
    result &= 0xFF;
    r.f_z = result === 0;
    r.f_h = 0;
    r.a = result;
});

regular.defineOperation(0x28, [3, 2], 1, 'JR Z, n', (r, m, a) => {if (r.f_z) {r.addToPC(a[0]); return true;} return false;});

regular.defineOperation(0x29, 2, 0, 'ADD HL, HL', (r, m, a) => {r.hl = functions.addWords(r.hl, r.hl)});

regular.defineOperation(0x2a, 2, 0, 'LD A, (HL+)', (r, m, a) => {r.a = m.getByte(r.hl++)});

regular.defineOperation(0x2b, 2, 0, 'DEC HL', (r, m, a) => {r.hl = (r.hl - 1) & 0xFFFF});

regular.defineOperation(0x2c, 1, 0, 'INC L', (r, m, a) => {r.l = functions.inc(r, r.l)});
regular.defineOperation(0x2d, 1, 0, 'DEC L', (r, m, a) => {r.l = functions.dec(r, r.l)});

regular.defineOperation(0x2e, 2, 1, 'LD L, n', (r, m, a) => {r.l = a[0]});

regular.defineOperation(0x2f, 1, 0, 'CPL', (r, m, a) => {r.f_n = 1; r.f_h = 1; r.a = ((-r.a) & 0xFF);});

regular.defineOperation(0x30, [4, 3], 1, 'JR NC, n', (r, m, a) => {if (!r.f_c) {r.addToPC(a[0]); return true;} return false;});

regular.defineOperation(0x31, 3, 2, 'LD SP, nn', (r, m, a) => {r.sp = toWord(a)});

regular.defineOperation(0x32, 2, 0, 'LD (HL-), A', (r, m, a) => {m.setByte(r.decrementHL(), r.a);});

regular.defineOperation(0x33, 2, 1, 'INC SP', (r, m, a) => {r.sp = (r.sp + 1) & 0xFFFF});

regular.defineOperation(0x34, 3, 0, 'INC (HL)', (r, m, a) => {m.setByte(r.hl, functions.inc(r, m.getByte(r.hl)))});
regular.defineOperation(0x35, 3, 0, 'DEC (HL)', (r, m, a) => {m.setByte(r.hl, functions.dec(r, m.getByte(r.hl)))});

regular.defineOperation(0x36, 3, 1, 'LD (HL), n', (r, m, a) => {m.setByte(r.hl, a[0])});

regular.defineOperation(0x37, 1, 0, 'SCF', (r, m, a) => {r.f_n = 0; r.f_h = 0; r.f_c = 1;});
regular.defineOperation(0x38, [3, 2], 1, 'JR C, n', (r, m, a) => {if (r.f_c) {r.addToPC(a[0]); return true;} return false;});

regular.defineOperation(0x39, 2, 0, 'ADD HL, SP', (r, m, a) => {r.hl = functions.addWords(r, r.hl, r.sp)});

regular.defineOperation(0x3a, 2, 0, 'LD A, (HL-)', (r, m, a) => {r.a = m.getByte(r.decrementHL())});
regular.defineOperation(0x3b, 2, 0, 'DEC SP', (r, m, a) => {r.sp = (r.sp - 1) & 0xFFFF});
regular.defineOperation(0x3c, 1, 0, 'INC A', (r, m, a) => {r.a = functions.inc(r, r.a)});
regular.defineOperation(0x3d, 1, 0, 'DEC A', (r, m, a) => {r.a = functions.dec(r, r.a)});
regular.defineOperation(0x3e, 2, 1, 'LD A, n', (r, m, a) => {r.a = a[0]});
regular.defineOperation(0x3f, 1, 0, 'CCF', (r, m, a) => {
    r.f_n = 0;
    r.f_h = 0;
    r.f_c = !r.f_c;
});

regular.defineOperation(0x40, 1, 0, 'LD B, B', (r, m, a) => {r.b = r.b});
regular.defineOperation(0x41, 1, 0, 'LD B, C', (r, m, a) => {r.b = r.c});
regular.defineOperation(0x42, 1, 0, 'LD B, D', (r, m, a) => {r.b = r.d});
regular.defineOperation(0x43, 1, 0, 'LD B, E', (r, m, a) => {r.b = r.e});
regular.defineOperation(0x44, 1, 0, 'LD B, H', (r, m, a) => {r.b = r.h});
regular.defineOperation(0x45, 1, 0, 'LD B, L', (r, m, a) => {r.b = r.l});
regular.defineOperation(0x46, 1, 0, 'LD B, (HL)', (r, m, a) => {r.b = m.getByte(r.hl)});
regular.defineOperation(0x47, 1, 0, 'LD B, A', (r, m, a) => {r.b = r.a});

regular.defineOperation(0x48, 1, 0, 'LD C, B', (r, m, a) => {r.c = r.b});
regular.defineOperation(0x49, 1, 0, 'LD C, C', (r, m, a) => {r.c = r.c});
regular.defineOperation(0x4a, 1, 0, 'LD C, D', (r, m, a) => {r.c = r.d});
regular.defineOperation(0x4b, 1, 0, 'LD C, E', (r, m, a) => {r.c = r.e});
regular.defineOperation(0x4c, 1, 0, 'LD C, H', (r, m, a) => {r.c = r.h});
regular.defineOperation(0x4d, 1, 0, 'LD C, L', (r, m, a) => {r.c = r.l});
regular.defineOperation(0x4e, 1, 0, 'LD C, (HL)', (r, m, a) => {r.c = m.getByte(r.hl)});
regular.defineOperation(0x4f, 1, 0, 'LD C, A', (r, m, a) => {r.c = r.a});

regular.defineOperation(0x50, 1, 0, 'LD D, B', (r, m, a) => {r.d = r.b});
regular.defineOperation(0x51, 1, 0, 'LD D, C', (r, m, a) => {r.d = r.c});
regular.defineOperation(0x52, 1, 0, 'LD D, D', (r, m, a) => {r.d = r.d});
regular.defineOperation(0x53, 1, 0, 'LD D, E', (r, m, a) => {r.d = r.e});
regular.defineOperation(0x54, 1, 0, 'LD D, H', (r, m, a) => {r.d = r.h});
regular.defineOperation(0x55, 1, 0, 'LD D, L', (r, m, a) => {r.d = r.l});
regular.defineOperation(0x56, 1, 0, 'LD D, (HL)', (r, m, a) => {r.d = m.getByte(r.hl)});
regular.defineOperation(0x57, 1, 0, 'LD D, A', (r, m, a) => {r.d = r.a});

regular.defineOperation(0x58, 1, 0, 'LD E, B', (r, m, a) => {r.e = r.b});
regular.defineOperation(0x59, 1, 0, 'LD E, C', (r, m, a) => {r.e = r.c});
regular.defineOperation(0x5a, 1, 0, 'LD E, D', (r, m, a) => {r.e = r.d});
regular.defineOperation(0x5b, 1, 0, 'LD E, E', (r, m, a) => {r.e = r.e});
regular.defineOperation(0x5c, 1, 0, 'LD E, H', (r, m, a) => {r.e = r.h});
regular.defineOperation(0x5d, 1, 0, 'LD E, L', (r, m, a) => {r.e = r.l});
regular.defineOperation(0x5e, 1, 0, 'LD E, (HL)', (r, m, a) => {r.e = m.getByte(r.hl)});
regular.defineOperation(0x5f, 1, 0, 'LD E, A', (r, m, a) => {r.e = r.a});

regular.defineOperation(0x60, 1, 0, 'LD H, B', (r, m, a) => {r.h = r.b});
regular.defineOperation(0x61, 1, 0, 'LD H, C', (r, m, a) => {r.h = r.c});
regular.defineOperation(0x62, 1, 0, 'LD H, D', (r, m, a) => {r.h = r.d});
regular.defineOperation(0x63, 1, 0, 'LD H, E', (r, m, a) => {r.h = r.e});
regular.defineOperation(0x64, 1, 0, 'LD H, H', (r, m, a) => {r.h = r.h});
regular.defineOperation(0x65, 1, 0, 'LD H, L', (r, m, a) => {r.h = r.l});
regular.defineOperation(0x66, 1, 0, 'LD H, (HL)', (r, m, a) => {r.h = m.getByte(r.hl)});
regular.defineOperation(0x67, 1, 0, 'LD H, A', (r, m, a) => {r.h = r.a});

regular.defineOperation(0x68, 1, 0, 'LD L, B', (r, m, a) => {r.l = r.b});
regular.defineOperation(0x69, 1, 0, 'LD L, C', (r, m, a) => {r.l = r.c});
regular.defineOperation(0x6a, 1, 0, 'LD L, D', (r, m, a) => {r.l = r.d});
regular.defineOperation(0x6b, 1, 0, 'LD L, E', (r, m, a) => {r.l = r.e});
regular.defineOperation(0x6c, 1, 0, 'LD L, H', (r, m, a) => {r.l = r.h});
regular.defineOperation(0x6d, 1, 0, 'LD L, L', (r, m, a) => {r.l = r.l});
regular.defineOperation(0x6e, 1, 0, 'LD L, (HL)', (r, m, a) => {r.l = m.getByte(r.hl)});
regular.defineOperation(0x6f, 1, 0, 'LD L, A', (r, m, a) => {r.l = r.a});

regular.defineOperation(0x70, 1, 0, 'LD (HL), B', (r, m, a) => {m.setByte(r.hl, r.b)});
regular.defineOperation(0x71, 1, 0, 'LD (HL), C', (r, m, a) => {m.setByte(r.hl, r.c)});
regular.defineOperation(0x72, 1, 0, 'LD (HL), D', (r, m, a) => {m.setByte(r.hl, r.d)});
regular.defineOperation(0x73, 1, 0, 'LD (HL), E', (r, m, a) => {m.setByte(r.hl, r.e)});
regular.defineOperation(0x74, 1, 0, 'LD (HL), H', (r, m, a) => {m.setByte(r.hl, r.h)});
regular.defineOperation(0x75, 1, 0, 'LD (HL), L', (r, m, a) => {m.setByte(r.hl, r.l)});

regular.defineOperation(0x76, 1, 0, 'HALT', TODO);

regular.defineOperation(0x77, 1, 0, 'LD (HL), A', (r, m, a) => {m.setByte(r.hl, r.a)});

regular.defineOperation(0x78, 1, 0, 'LD A, B', (r, m, a) => {r.a = r.b});
regular.defineOperation(0x79, 1, 0, 'LD A, C', (r, m, a) => {r.a = r.c});
regular.defineOperation(0x7a, 1, 0, 'LD A, D', (r, m, a) => {r.a = r.d});
regular.defineOperation(0x7b, 1, 0, 'LD A, E', (r, m, a) => {r.a = r.e});
regular.defineOperation(0x7c, 1, 0, 'LD A, H', (r, m, a) => {r.a = r.h});
regular.defineOperation(0x7d, 1, 0, 'LD A, L', (r, m, a) => {r.a = r.l});
regular.defineOperation(0x7e, 1, 0, 'LD A, (HL)', (r, m, a) => {r.a = m.getByte(r.hl)});
regular.defineOperation(0x7f, 1, 0, 'LD A, A', (r, m, a) => {r.a = r.a});

regular.defineOperation(0x80, 1, 0, 'ADD A, B', (r, m, a) => {r.a = functions.addBytes(r.a, r.b)});
regular.defineOperation(0x81, 1, 0, 'ADD A, C', (r, m, a) => {r.a = functions.addBytes(r.a, r.c)});
regular.defineOperation(0x82, 1, 0, 'ADD A, D', (r, m, a) => {r.a = functions.addBytes(r.a, r.d)});
regular.defineOperation(0x83, 1, 0, 'ADD A, E', (r, m, a) => {r.a = functions.addBytes(r.a, r.e)});
regular.defineOperation(0x84, 1, 0, 'ADD A, H', (r, m, a) => {r.a = functions.addBytes(r.a, r.h)});
regular.defineOperation(0x85, 1, 0, 'ADD A, L', (r, m, a) => {r.a = functions.addBytes(r.a, r.l)});
regular.defineOperation(0x86, 2, 0, 'ADD A, (HL)', (r, m, a) => {r.a = functions.addBytes(r.a, m.getByte(r.hl))});
regular.defineOperation(0x87, 1, 0, 'ADD A, A', (r, m, a) => {r.a = functions.addBytes(r.a, r.a)});

regular.defineOperation(0x88, 1, 0, 'ADC A, B', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.b)});
regular.defineOperation(0x89, 1, 0, 'ADC A, C', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.c)});
regular.defineOperation(0x8a, 1, 0, 'ADC A, D', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.d)});
regular.defineOperation(0x8b, 1, 0, 'ADC A, E', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.e)});
regular.defineOperation(0x8c, 1, 0, 'ADC A, H', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.h)});
regular.defineOperation(0x8d, 1, 0, 'ADC A, L', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.l)});
regular.defineOperation(0x8e, 2, 0, 'ADC A, (HL)', (r, m, a) => {r.a = functions.addBytesAndCarry(r.a, m.getByte(r.hl))});
regular.defineOperation(0x8f, 1, 0, 'ADC A, A', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, r.a)});

regular.defineOperation(0x90, 1, 0, 'SUB B', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.b)});
regular.defineOperation(0x91, 1, 0, 'SUB C', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.c)});
regular.defineOperation(0x92, 1, 0, 'SUB D', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.d)});
regular.defineOperation(0x93, 1, 0, 'SUB E', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.e)});
regular.defineOperation(0x94, 1, 0, 'SUB H', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.h)});
regular.defineOperation(0x95, 1, 0, 'SUB L', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.l)});
regular.defineOperation(0x96, 2, 0, 'SUB (HL)', (r, m, a) => {r.a = functions.subBytes(r.a, m.getByte(r.hl))});
regular.defineOperation(0x97, 1, 0, 'SUB A', (r, m, a) => {r.a = functions.subBytes(r, r.a, r.a)});

regular.defineOperation(0x98, 1, 0, 'SBC A, B', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.b)});
regular.defineOperation(0x99, 1, 0, 'SBC A, C', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.c)});
regular.defineOperation(0x9a, 1, 0, 'SBC A, D', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.d)});
regular.defineOperation(0x9b, 1, 0, 'SBC A, E', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.e)});
regular.defineOperation(0x9c, 1, 0, 'SBC A, H', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.h)});
regular.defineOperation(0x9d, 1, 0, 'SBC A, L', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.l)});
regular.defineOperation(0x9e, 2, 0, 'SBC A, (HL)', (r, m, a) => {r.a = functions.subBytesWithCarry(r.a, m.getByte(r.hl))});
regular.defineOperation(0x9f, 1, 0, 'SBC A, A', (r, m, a) => {r.a = functions.subBytesWithCarry(r, r.a, r.a)});

regular.defineOperation(0xa0, 1, 0, 'AND B', (r, m, a) => {r.a = functions.and(r, r.a, r.b)});
regular.defineOperation(0xa1, 1, 0, 'AND C', (r, m, a) => {r.a = functions.and(r, r.a, r.c)});
regular.defineOperation(0xa2, 1, 0, 'AND D', (r, m, a) => {r.a = functions.and(r, r.a, r.d)});
regular.defineOperation(0xa3, 1, 0, 'AND E', (r, m, a) => {r.a = functions.and(r, r.a, r.e)});
regular.defineOperation(0xa4, 1, 0, 'AND H', (r, m, a) => {r.a = functions.and(r, r.a, r.h)});
regular.defineOperation(0xa5, 1, 0, 'AND L', (r, m, a) => {r.a = functions.and(r, r.a, r.l)});
regular.defineOperation(0xa6, 2, 0, 'AND (HL)', (r, m, a) => {r.a = functions.and(r.a, m.getByte(r.hl))});
regular.defineOperation(0xa7, 1, 0, 'AND A', (r, m, a) => {r.a = functions.and(r, r.a, r.a)});

regular.defineOperation(0xa8, 1, 0, 'XOR B', (r, m, a) => {r.a = functions.xor(r, r.a, r.b)});
regular.defineOperation(0xa9, 1, 0, 'XOR C', (r, m, a) => {r.a = functions.xor(r, r.a, r.c)});
regular.defineOperation(0xaa, 1, 0, 'XOR D', (r, m, a) => {r.a = functions.xor(r, r.a, r.d)});
regular.defineOperation(0xab, 1, 0, 'XOR E', (r, m, a) => {r.a = functions.xor(r, r.a, r.e)});
regular.defineOperation(0xac, 1, 0, 'XOR H', (r, m, a) => {r.a = functions.xor(r, r.a, r.h)});
regular.defineOperation(0xad, 1, 0, 'XOR L', (r, m, a) => {r.a = functions.xor(r, r.a, r.l)});
regular.defineOperation(0xae, 2, 0, 'XOR (HL)', (r, m, a) => {r.a = functions.xor(r.a, m.getByte(r.hl))});
regular.defineOperation(0xaf, 1, 0, 'XOR A', (r, m, a) => {r.a = functions.xor(r, r.a, r.a)});

regular.defineOperation(0xb0, 1, 0, 'OR B', (r, m, a) => {r.a = functions.or(r, r.a, r.b)});
regular.defineOperation(0xb1, 1, 0, 'OR C', (r, m, a) => {r.a = functions.or(r, r.a, r.c)});
regular.defineOperation(0xb2, 1, 0, 'OR D', (r, m, a) => {r.a = functions.or(r, r.a, r.d)});
regular.defineOperation(0xb3, 1, 0, 'OR E', (r, m, a) => {r.a = functions.or(r, r.a, r.e)});
regular.defineOperation(0xb4, 1, 0, 'OR H', (r, m, a) => {r.a = functions.or(r, r.a, r.h)});
regular.defineOperation(0xb5, 1, 0, 'OR L', (r, m, a) => {r.a = functions.or(r, r.a, r.l)});
regular.defineOperation(0xb6, 2, 0, 'OR (HL)', (r, m, a) => {r.a = functions.or(r.a, m.getByte(r.hl))});
regular.defineOperation(0xb7, 1, 0, 'OR A', (r, m, a) => {r.a = functions.or(r, r.a, r.a)});

regular.defineOperation(0xB8, 1, 0, 'CP B', (r, m, a) => {subBytes(r, r.a, r.b)});
regular.defineOperation(0xB9, 1, 0, 'CP C', (r, m, a) => {subBytes(r, r.a, r.c)});
regular.defineOperation(0xBa, 1, 0, 'CP D', (r, m, a) => {subBytes(r, r.a, r.d)});
regular.defineOperation(0xBb, 1, 0, 'CP E', (r, m, a) => {subBytes(r, r.a, r.e)});
regular.defineOperation(0xBc, 1, 0, 'CP H', (r, m, a) => {subBytes(r, r.a, r.h)});
regular.defineOperation(0xBd, 1, 0, 'CP L', (r, m, a) => {subBytes(r, r.a, r.l)});
regular.defineOperation(0xBe, 2, 0, 'CP (HL)', (r, m, a) => {subBytes(r, r.a, m.getByte(r.hl))});
regular.defineOperation(0xBf, 1, 0, 'CP A', (r, m, a) => {subBytes(r, r.a, r.a)});

regular.defineOperation(0xc0, [5, 2], 0, 'RET NZ', (r, m, a) => {if (!r.f_z) {functions.ret(r, m); return true;} return false;});

regular.defineOperation(0xc1, 3, 0, 'POP BC', (r, m, a) => {r.bc = functions.pop(r, m)});

regular.defineOperation(0xc2, [4, 3], 2, 'JP NZ, nn', (r, m, a) => {if (!r.f_z) {r.pc = toWord(a); return true;} return false;});

regular.defineOperation(0xc3, 4, 2, 'JP nn', (r, m, a) => {r.pc = toWord(a)});

regular.defineOperation(0xc4, [6, 3], 2, 'CALL NZ, nn', (r, m, a) => {if (!r.f_z) {functions.call(r, m, toWord(a)); return true;} return false;});

regular.defineOperation(0xc5, 4, 0, 'PUSH BC', (r, m, a) => {functions.push(r, m, r.bc)});

regular.defineOperation(0xc6, 2, 1, 'ADD A, n', (r, m, a) => {r.a = functions.addBytes(r, r.a, a[0])});

regular.defineOperation(0xc7, 4, 0, 'RST 00H', (r, m, a) => {functions.reset(r, m, 0x00)});

regular.defineOperation(0xc8, [5, 2], 0, 'RET Z', (r, m, a) => {if (r.f_z) {functions.ret(r, m); return true;} return false;});

regular.defineOperation(0xc9, 4, 0, 'RET', (r, m, a) => {functions.ret(r, m)});

regular.defineOperation(0xca, [4, 3], 2, 'JP Z, nn', (r, m, a) => {if (r.f_z) {r.pc = toWord(a); return true;} return false;});

// 0xCB is prefix.

regular.defineOperation(0xcc, [6, 3], 2, 'CALL Z, nn', (r, m, a) => {if (r.f_z) {functions.call(r, m, toWord(a)); return true;} return false;});

regular.defineOperation(0xcd, 6, 2, 'CALL nn', (r, m, a) => {functions.call(r, m, toWord(a))});

regular.defineOperation(0xce, 2, 1, 'ADC A, n', (r, m, a) => {r.a = functions.addBytesAndCarry(r, r.a, a[0])});

regular.defineOperation(0xcf, 4, 0, 'RST 08H', (r, m, a) => {functions.reset(r, m, 0x08)});

regular.defineOperation(0xd0, [5, 2], 0, 'RET NC', (r, m, a) => {if (!r.f_c) {functions.ret(r, m); return true;} return false;});

regular.defineOperation(0xd1, 4, 0, 'POP DE', (r, m, a) => {r.de = functions.pop(r, m)});

regular.defineOperation(0xd2, [4, 3], 2, 'JP NC, nn', (r, m, a) => {if (!r.f_c) r.pc = toWord(a);});

regular.defineOperation(0xd4, [6, 3], 2, 'CALL NC, nn', (r, m, a) => {if (!r.f_c) {functions.call(r, m, toWord(a)); return true;} return false;});

regular.defineOperation(0xd5, 4, 0, 'PUSH DE', (r, m, a) => {functions.push(r, m, r.de)});

regular.defineOperation(0xd6, 2, 1, 'SUB n', (r, m, a) => {r.a = functions.subBytes(r.a, a[0])});

regular.defineOperation(0xd7, 4, 0, 'RST 10H', (r, m, a) => {functions.reset(r, m, 0x10)});

regular.defineOperation(0xd8, [5, 2], 0, 'RET C', (r, m, a) => {if (r.f_c) {functions.ret(r, m); return true;} return false;});

regular.defineOperation(0xd9, 4, 0, 'RETI', (r, m, a) => {functions.ret(r, m); r.ime = true;});

regular.defineOperation(0xda, [4, 3], 2, 'JP C, nn', (r, m, a) => {if (r.f_c) r.pc = toWord(a)});

regular.defineOperation(0xdc, [6, 3], 2, 'CALL C, nn', (r, m, a) => {if (r.f_c) {functions.call(r, m, toWord(a)); return true;} return false;});

regular.defineOperation(0xde, 2, 1, 'SBC A, n', (r, m, a) => {r.a = functions.subBytesWithCarry(r.a, a[0])});

regular.defineOperation(0xdf, 4, 0, 'RST 18H', (r, m, a) => {functions.reset(r, m, 0x18)});

regular.defineOperation(0xe0, 3, 1, 'LDH (n), A', (r, m, a) => {m.setByte(0xFF00 + a[0], r.a)});

regular.defineOperation(0xe1, 3, 0, 'POP HL', (r, m, a) => {r.hl = functions.pop(r, m)});

regular.defineOperation(0xe2, 2, 0, 'LD (C), A', (r, m, a) => {m.setByte(0xff00 + r.c, r.a)});

regular.defineOperation(0xe5, 4, 0, 'PUSH HL', (r, m, a) => {functions.push(r, m, r.hl)});

regular.defineOperation(0xe6, 2, 1, 'AND n', (r, m, a) => {r.a = functions.and(r, r.a, a[0])});

regular.defineOperation(0xe7, 4, 1, 'RST 20H', (r, m, a) => {functions.reset(r, m, 0x20)});

regular.defineOperation(0xe8, 4, 1, 'ADD SP, n', (r, m, a) => {r.sp = addSignedByteToWord(r, r.sp, a[0])});

regular.defineOperation(0xe9, 1, 0, 'JP (HL)', (r, m, a) => {r.pc = m.getByte(r.hl);});

regular.defineOperation(0xea, 4, 2, 'LD (nn), A', (r, m, a) => {m.setByte(toWord(a), r.a)});

regular.defineOperation(0xee, 2, 1, 'XOR n', (r, m, a) => {r.a = functions.xor(r.a, a[0])});

regular.defineOperation(0xef, 4, 0, 'RST 28H', (r, m, a) => {functions.reset(r, m, 0x28)});

regular.defineOperation(0xf0, 3, 1, 'LDH A, (n)', (r, m, a) => {r.a = m.getByte(0xFF00 + a[0])});

regular.defineOperation(0xf1, 3, 0, 'POP AF', (r, m, a) => {r.af = functions.pop(r, m)});

regular.defineOperation(0xf2, 2, 0, 'LD A, (C)', (r, m, a) => {r.a = m.getByte(0xFF00 + r.c)});

regular.defineOperation(0xf3, 1, 0, 'DI', (r, m, a) => {r.ime = 0});

regular.defineOperation(0xf5, 4, 0, 'PUSH AF', (r, m, a) => {functions.push(r, m, r.af)});

regular.defineOperation(0xf6, 2, 1, 'OR n', (r, m, a) => {r.a = functions.or(r.a, a[0])});

regular.defineOperation(0xf7, 4, 1, 'RST 30H', (r, m, a) => {functions.reset(r, m, 0x30)});

regular.defineOperation(0xf8, 4, 1, 'LD HL, SP+n', (r, m, a) => {r.hl = addSignedByteToWord(r, r.sp, a[0])});

regular.defineOperation(0xf9, 2, 1, 'LD SP, HL', (r, m, a) => {r.sp = r.hl;});

regular.defineOperation(0xfa, 4, 2, 'LD A, (nn)', (r, m, a) => {r.a = m.getByte(toWord(a))});

regular.defineOperation(0xfb, 1, 0, 'EI', (r, m, a) => {r.ime = 1});

regular.defineOperation(0xfe, 2, 1, 'CP n', (r, m, a) => {functions.subBytes(r, r.a, a[0])});

regular.defineOperation(0xff, 4, 0, 'RST 38H', (r, m, a) => {functions.reset(r, m, 0x38)});

module.exports = regular;
