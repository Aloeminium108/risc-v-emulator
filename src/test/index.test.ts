import { assembleLine } from "../Assembler/assembler";
import { parse, parserTestCases } from "../Assembler/parser";
import { getBit, getBitTestCases, getRange, getRangeTestCases, setBit, setBitTestCases, setRange, setRangeTestCases } from "../binaryFunctions";

describe('Testing Parser:', () => {
  parserTestCases.forEach((expected: string[], input: string[]) => {
    test(`Input: ${input}`, () => {
      expect(parse(input)).toStrictEqual(expected);
    });
  })
});

describe('Testing getBit function:', () => {
  getBitTestCases.forEach((expected: number, input: number[]) => {
    test(`Input: ${input[0]}, ${input[1]}`, () => {
      expect(getBit(input[0], input[1])).toBe(expected);
    })
  })
});

describe('Testing setBit function:', () => {
  setBitTestCases.forEach((expected: number, input: number[]) => {
    test(`Input: ${input[0]}, ${input[1]}, ${input[2]}`, () => {
      expect(setBit(input[0], input[1], input[2])).toBe(expected);
    })
  })
});

describe('Testing getRange function:', () => {
  getRangeTestCases.forEach((expected: number, input: number[]) => {
    test(`Input: ${input[0]}, ${input[1]}, ${input[2]}`, () => {
      expect(getRange(input[0], input[1], input[2])).toBe(expected);
    })
  })
});

describe('Testing setRange function:', () => {
  setRangeTestCases.forEach((expected: number, input: number[]) => {
    test(`Input: ${input[0]}, ${input[1]}, ${input[2]}, ${input[3]}`, () => {
      expect(setRange(input[0], input[1], input[2], input[3])).toBe(expected);
    })
  })
});

describe('Testing assembleLine function:', () => {
  test('Input: addi, x17, x0, 93', () => {
    expect(assembleLine('addi, x17, x0, 93')).toHaveProperty('binary', 0x05D00893)
  })

  test('Input: add fp, a2, t4', () => {
    expect(assembleLine('add fp, a2, t4')).toHaveProperty('binary', 0x01D60433)
  })
});