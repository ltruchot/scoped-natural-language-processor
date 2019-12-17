export declare type CustomError = {
    code: number;
    msg: string;
};
export declare type ProcessError = {
    input: unknown;
    errors: Array<CustomError>;
};
export declare type Inferred = {
    input: any;
    sanitized: string;
    words: string[];
};
//# sourceMappingURL=models.d.ts.map