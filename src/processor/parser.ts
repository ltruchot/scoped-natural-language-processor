// npm
import {
  Either, left, right, chain,
} from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';

// domain
import { getError } from './errors';
import { sanitize } from './sanitizer';
import { Inferred, ProcessError } from './models';

// helpers
import { trim, replace, split } from '../helpers/string';
import { compact } from '../helpers/array';


type FnParse = (input: unknown) => Either<ProcessError, Inferred>;
export const parse: FnParse = (input) => {
  if (typeof input !== 'string') {
    return left({ input, errors: [getError(0)] } as ProcessError);
  }
  const sanitized = sanitize(input);
  if (!sanitized) {
    return left({ input, errors: [getError(1)] } as ProcessError);
  }

  return right({
    input,
    sanitized,
    words: [],
  } as Inferred);
};

type FnSplitWords = (s: string) => string[];
export const splitWords: FnSplitWords = flow(replace(/\s+/g, ' '), trim, split(' '), compact);

type FnGetWords = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;
export const getWords: FnGetWords = (e) => chain(({ input, sanitized }: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({ input, sanitized, words } as Inferred)
    : left({ input, errors: [getError(2)] } as ProcessError);
})(e);

// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
