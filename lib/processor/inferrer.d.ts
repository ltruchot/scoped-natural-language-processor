import { Either } from 'fp-ts/lib/Either';
import { ProcessError, Inferred } from './models';
declare type FnInfer = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export declare const infer: FnInfer;
export {};
//# sourceMappingURL=inferrer.d.ts.map