export declare class CPU {
    ram: ArrayBuffer;
    instructionPointer: number;
    registerSet: RegisterSet;
    constructor(ram: ArrayBuffer, instructionPointer: number);
    executeInstruction(instruction: number): void;
    private executeR_Type;
    private executeI_Type;
    private executeS_Type;
    private executeB_Type;
    private executeU_Type;
    private executeJ_Type;
}
export declare class RegisterSet {
    private registerBuffer;
    private registerView;
    constructor(numRegisters: number);
    getRegister(index: number): number;
    getRegisterU(index: number): number;
    setRegister(index: number, value: number): void;
    setRegisterU(index: number, value: number): void;
}
