import { right, Either, chain } from 'fp-ts/lib/Either';
import { ProcessError, Inferred } from './models';


type FnInfer = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export const infer: FnInfer = (e) => chain((i) => right(i) as Either<ProcessError, Inferred>)(e);
