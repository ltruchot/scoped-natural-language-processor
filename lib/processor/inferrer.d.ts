import { Either } from 'fp-ts/lib/Either';
import { ProcessError } from './errors';
export declare type Inferred = {
    input: any;
    sanitized: string;
    words: string[];
};
declare type FnInfer = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export declare const infer: FnInfer;
export {};
//# sourceMappingURL=inferrer.d.ts.map