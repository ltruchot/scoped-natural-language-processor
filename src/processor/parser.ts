// ---- IMPORTS
// npm
import {
  Either, left, right, chain,
} from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';

// domain
import {
  all, pipe, replace, trim, split,
} from 'ramda';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { getError } from './errors';
import { sanitize } from './sanitizer';
import {
  Inferred, ProcessError, ProcessStep, Concept,
} from './models';

// helpers
import { compact, isNonEmptyStringArray } from '../helpers/array';

// ---- METHODS
type FnCheckArgs = (config: unknown, input: unknown) => Either<ProcessError, Inferred>;
const checkArgs: FnCheckArgs = (config, input) => {
  // input should be a string
  if (typeof input !== 'string') {
    return left({ input, config, errors: [getError(0)] } as ProcessError);
  }

  // input should not be empty
  if (input === '') {
    return left({ input, config, errors: [getError(1)] } as ProcessError);
  }

  // config should be an Array
  if (!Array.isArray(config)) {
    return left({ input, config, errors: [getError(2)] } as ProcessError);
  }

  // config shouldn't be empty
  if (config.length === 0) {
    return left({ input, config, errors: [getError(3)] } as ProcessError);
  }

  // config should be well formatted
  const isValidConfig = all((item: any) => item.key
    && Array.isArray(item.is)
    && (isNonEmptyStringArray(item.is) || all(isNonEmptyStringArray, item.is)));

  if (!isValidConfig(config)) {
    return left({ input, config, errors: [getError(4)] } as ProcessError);
  }


  return right({
    input: input as string,
    config: config as NonEmptyArray<Concept>,
    sanitized: '',
    words: [],
    solution: [],
    understood: {},
  } as Inferred);
};


const clean: ProcessStep = chain(({ input, config, ...rest }: Inferred) => {
  const sanitized = sanitize(input);
  return sanitized
    ? right({
      input, config, ...rest, sanitized,
    })
    : left({ input, config, errors: [getError(5)] });
});

type FnSplitWords = (s: string) => string[];
const splitWords: FnSplitWords = pipe(replace(/\s+/g, ' '), trim, split(' '), compact);

const getWords: ProcessStep = chain(({
  input, config, sanitized, ...inferred
}: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({
      ...inferred, input, config, sanitized, words: words as NonEmptyArray<string>,
    } as Inferred)
    : left({ input, config, errors: [getError(6)] } as ProcessError);
});

export const parse = flow(checkArgs, clean, getWords);

// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
