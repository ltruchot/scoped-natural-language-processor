// npm
import { flow } from 'fp-ts/lib/function';
import { fold, Either } from 'fp-ts/lib/Either';

// models
import {
  ProcessError, Inferred, Output, Concept,
} from './processor/models';

// functions
import { parse } from './processor/parser';
import { infer } from './processor/inferrer';

// foldProcess: extract data from Either
const l = (val: ProcessError): Output => [val, null];
const r = (val: Inferred): Output => [null, val];
type FnFoldProcess = (e: Either<ProcessError, Inferred>) => Output;
const foldProcess: FnFoldProcess = (e) => fold(l, r)(e);

// process: composition of understanding steps + extraction
type FnProcess = (config: unknown, input: unknown) => Output;
export const process: FnProcess = flow(parse, infer, foldProcess);

// shared types export
export { Concept, ProcessError, Inferred };
