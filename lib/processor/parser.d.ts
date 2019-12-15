import { Either } from 'fp-ts/lib/Either';
import { ProcessError } from './errors';
import { Inferred } from './inferrer';
declare type FnParse = (input: unknown) => Either<ProcessError, Inferred>;
export declare const parse: FnParse;
export {};
//# sourceMappingURL=parser.d.ts.map