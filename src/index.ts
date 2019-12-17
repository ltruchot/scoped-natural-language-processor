import { flow } from 'fp-ts/lib/function';
import { parse, getWords } from './processor/parser';
import { infer } from './processor/inferrer';

export const process = flow(parse, getWords, infer);
console.log(process('Draw    me a sheep  '));
