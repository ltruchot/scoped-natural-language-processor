import { Either } from 'fp-ts/lib/Either';
export declare type Concept = {
    key: string;
    is: string[] | Array<string[]>;
};
export declare type CustomError = {
    code: number;
    msg: string;
};
export declare type ProcessError = {
    input: unknown;
    config: unknown;
    errors: Array<CustomError>;
};
export declare type Inferred = {
    input: string;
    config: Concept[];
    sanitized: string;
    words: string[];
};
export declare type ProcessStep = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export declare type Output = [ProcessError, null] | [null, Inferred];
//# sourceMappingURL=models.d.ts.map