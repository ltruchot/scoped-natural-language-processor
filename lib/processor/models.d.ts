import { Either } from 'fp-ts/lib/Either';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
export declare type Concept = {
    key: string;
    is: string[] | Array<string[]>;
};
export declare type CustomError = {
    code: number;
    msg: string;
    data?: string[];
};
export declare type ProcessError = {
    input: unknown;
    config: unknown;
    errors: NonEmptyArray<CustomError>;
};
export declare type Inferred = {
    input: string;
    config: NonEmptyArray<Concept>;
    sanitized: string;
    words: string[];
    solution: string[];
    understood: any;
};
export declare type ProcessStep = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export declare type Output = [ProcessError, null] | [null, Inferred];
//# sourceMappingURL=models.d.ts.map