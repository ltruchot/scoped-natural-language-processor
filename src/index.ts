import { flow } from 'fp-ts/lib/function';
import { fold, Either } from 'fp-ts/lib/Either';
import { parse } from './processor/parser';
import { infer } from './processor/inferrer';
import { ProcessError, Inferred, Output } from './processor/models';

const l = (val: ProcessError): Output => [val, null];
const r = (val: Inferred): Output => [null, val];
type FnFoldProcess = (e: Either<ProcessError, Inferred>) => Output;
const foldProcess: FnFoldProcess = (e) => fold(l, r)(e);

type FnProcess = (config: unknown, input: unknown) => Output;
export const process: FnProcess = flow(parse, infer, foldProcess);
console.log(process([], 'Draw    me a sheep  '));
console.log(process([], ''));
