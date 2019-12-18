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
import { compact } from '../helpers/array';

// ---- METHODS
type FnCheckArgs = (config: unknown, input: unknown) => Either<ProcessError, Inferred>;
const checkArgs: FnCheckArgs = (config, input) => {
  const errors = [];

  if (typeof input !== 'string') {
    errors.push(getError(0));
  }

  // TODO: deep check of config
  if (!Array.isArray(config)) {
    errors.push(getError(1));
  }

  return errors.length
    ? left({ input, config, errors })
    : right({
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
    : left({ input, config, errors: [getError(3)] });
});

type FnSplitWords = (s: string) => string[];
const splitWords: FnSplitWords = flow(replace(/\s+/g, ' '), trim, split(' '), compact);

const getWords: ProcessStep = chain(({ input, config, sanitized }: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({
      input, config, sanitized, words,
    })
    : left({ input, config, errors: [getError(3)] });
});

export const parse = flow(checkArgs, clean, getWords);

// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
