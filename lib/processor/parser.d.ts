import { Either } from 'fp-ts/lib/Either';
import { Inferred, ProcessError } from './models';
declare type FnParse = (input: unknown) => Either<ProcessError, Inferred>;
export declare const parse: FnParse;
declare type FnSplitWords = (s: string) => string[];
export declare const splitWords: FnSplitWords;
declare type FnGetWords = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export declare const getWords: FnGetWords;
export {};
//# sourceMappingURL=parser.d.ts.map