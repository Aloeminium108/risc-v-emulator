// Returns bits from 32-bit input in specified range
export function getRange(input: number, upperEnd: number, lowerEnd: number): number {
  if (
    upperEnd > 31 ||
    lowerEnd < 0 ||
    lowerEnd > upperEnd ||
    lowerEnd === upperEnd
  ) {
    throw new Error('Specified range not possible');
  }

  let result = input;

  if (upperEnd < 31) {
    const bitmask: number = 0xFFFFFFFF >>> (31 - upperEnd);
    result &= bitmask;
  }

  return result >>> lowerEnd;

}

// Sets bits from 32-bit input in specified range to provided value
export function setRange(input: number, value: number, upperEnd: number, lowerEnd: number): number {
  if (
    upperEnd > 31 ||
    lowerEnd < 0 ||
    lowerEnd > upperEnd ||
    lowerEnd === upperEnd
  ) {
    throw new Error('Specified range not possible');
  }

  if (value > (2 ** (1 + upperEnd - lowerEnd)) - 1) {
    throw new Error(`Value does not fit within specified range; max value: ${(2 ** (1 + upperEnd - lowerEnd)) - 1}, value supplied: ${value}`);
  }

  const lowerMask = 0xFFFFFFFF >>> (31 - lowerEnd);
  const upperMask = 0xFFFFFFFF << upperEnd;
  const bitMask = lowerMask | upperMask;

  return (input & bitMask) | (value << lowerEnd);

}

// Returns specified bit from 32-bit input
export function getBit(input: number, index: number): number {
  if (
    index > 31 ||
    index < 0
  ) {
    throw new Error('Specified index not possible');
  }

  return (input >>> index) & 0x00000001
}

// Sets the specified bit to provided value in given input
export function setBit(input: number, value: number, index: number): number {
  if (
    index > 31 ||
    index < 0
  ) {
    throw new Error('Specified index not possible');
  }

  if (value !== 0 && value !== 1) {
    throw new Error(`Specified value must be 1 or 0; value received: ${value}`);
  }

  return value === 1 ? 
    input | (1 << index) :
    (input | (1 << index)) ^ (1 << index);

}

export const getBitTestCases: Map<number[], number> = new Map([
  [[32, 4], 0],
  [[32, 5], 1],
  [[32, 6], 0],
  [[24, 2], 0],
  [[24, 3], 1],
  [[24, 4], 1],
  [[24, 5], 0],
  [[48, 3], 0],
  [[48, 4], 1],
  [[48, 5], 1],
  [[0x80000000, 30], 0],
  [[0x80000000, 31], 1]
]);

export const setBitTestCases: Map<number[], number> = new Map([
  [[0, 1, 0], 1],
  [[0, 1, 1], 2],
  [[0, 1, 2], 4],
  [[0, 1, 3], 8],
  [[0, 1, 4], 16],
  [[0, 1, 5], 32],
  [[31, 0, 0], 30],
])

export const getRangeTestCases: Map<number[], number> = new Map([
  [[0xFF, 3, 0], 0xF],
  [[0xFFFFFFFF, 31, 0], 0xFFFFFFFF],
  [[0xFFFFFFFF, 30, 0], 0x7FFFFFFF],
  [[0xFFFFFFFF, 12, 9], 0xF],
  [[0x0A0B0C0D, 23, 8], 0x0B0C]
]);

export const setRangeTestCases: Map<number[], number> = new Map([
  [[0, 0xFF, 7, 0], 0xFF],
  [[0, 0xFF, 15, 8], 0xFF00],
  [[0x0A0B0C0D, 0xFF, 15, 8], 0x0A0BFF0D]
]);