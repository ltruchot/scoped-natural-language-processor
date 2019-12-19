// ---- IMPORTS
// npm
import {
  Either, left, right, chain,
} from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';

// domain
import { getError } from './errors';
import { sanitize } from './sanitizer';
import {
  Inferred, ProcessError, ProcessStep, Concept,
} from './models';

// helpers
import { trim, replace, split } from '../helpers/string';
import { compact, all, isStringArray } from '../helpers/array';

// ---- METHODS
type FnCheckArgs = (config: unknown, input: unknown) => Either<ProcessError, Inferred>;
const checkArgs: FnCheckArgs = (config, input) => {
  // input should be a string
  if (typeof input !== 'string') {
    return left({ input, config, errors: [getError(0)] });
  }

  // input should not be empty
  if (input === '') {
    return left({ input, config, errors: [getError(1)] });
  }

  // config should be an Array
  if (!Array.isArray(config)) {
    return left({ input, config, errors: [getError(2)] });
  }

  // config shouldn't be empty
  if (config.length === 0) {
    return left({ input, config, errors: [getError(3)] });
  }

  // config should be well formatted
  const isValidConfig = all((item) => item.key
    && Array.isArray(item.is)
    && (isStringArray(item.is) || all(isStringArray, item.is)));
  if (!isValidConfig(config)) {
    return left({ input, config, errors: [getError(4)] });
  }


  return right({
    input: input as string,
    config: config as Concept[],
    sanitized: '',
    words: [],
  });
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
const splitWords: FnSplitWords = flow(replace(/\s+/g, ' '), trim, split(' '), compact);

const getWords: ProcessStep = chain(({ input, config, sanitized }: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({
      input, config, sanitized, words,
    })
    : left({ input, config, errors: [getError(6)] });
});

export const parse = flow(checkArgs, clean, getWords);

// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
