export declare type CustomError = {
    code: number;
    msg: string;
};
export declare type ProcessError = {
    input: unknown;
    errors: Array<CustomError>;
};
declare type FnGetError = (code: number) => CustomError;
export declare const getError: FnGetError;
export {};
//# sourceMappingURL=errors.d.ts.map