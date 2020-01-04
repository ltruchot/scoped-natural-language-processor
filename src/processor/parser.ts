// ---- IMPORTS
// npm
import {
  Either, left, right, chain,
} from 'fp-ts/lib/Either';
import {
  all, pipe, replace, trim, split, reduce,
  uniq, flatten, filter, head, take, join, drop, sort, map,
} from 'ramda';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

// domain
import { getError } from './errors';
import { sanitize } from './sanitizer';
import {
  Inferred, ProcessError, ProcessStep, Concept,
} from './models';

// helpers
import { compact, isNonEmptyStringArray } from '../helpers/array';


// ---- METHODS
type FnGetAutorizedWords = (concepts: NonEmptyArray<Concept>) => string[];
export const getAuthorizedWords: FnGetAutorizedWords = (concepts) => {
  const words: string[] = pipe(
    reduce((acc: string[], cur: Concept) => [
      ...acc,
      ...flatten(cur.is)], []),
    uniq,
    filter((item) => head(item) !== '*'),
  )(concepts);
  return words;
};

type FnSplitWords = (s: string) => string[];
const splitWords: FnSplitWords = pipe(replace(/\s+/g, ' '), trim, split(' '), compact);

type FnExtractMatchedWords = (authWords: string[], str: string, foundWords?: string[]) => string[] ;
export const extractMatchedWords: FnExtractMatchedWords = (authWords, str, foundWords = []) => {
  const splitted: string[] = splitWords(str);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < splitted.length; i++) {
    const wds = pipe(take(i + 1), join(' '))(splitted);
    const found = authWords.find((w: string) => w === wds);
    if (found) {
      foundWords.push(found);
      const newStr = pipe(drop(i + 1), join(' '))(splitted);
      if (newStr) {
        return extractMatchedWords(authWords, newStr, foundWords);
      }
      break;
    }
    // let retry, droping a word
    if (i + 1 === splitted.length) {
      splitted.shift();
      i = -1;
    }
  }
  return foundWords;
};


type FnCheckAllFound = (wds: string[], sentence: string) => any;
export const checkAllFound: FnCheckAllFound = (wds, sentence) => pipe(
  sort((a: string, b: string) => b.length - a.length),
  reduce(
    (acc: string, cur: string) => acc.replace(new RegExp(`\\b(${cur})\\b`), '#|#') as any,
    sentence,
  ),
  split('#|#'),
  map(trim),
  compact,
)(wds);


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
    && Array.isArray(item.is) && Array.isArray(item.contains)
    && (isNonEmptyStringArray(item.is) || isNonEmptyStringArray, item.contains));

  if (!isValidConfig(config)) {
    return left({ input, config, errors: [getError(4)] } as ProcessError);
  }
  return right({
    input: input as string,
    config: config as NonEmptyArray<Concept>,
    sanitized: '',
    words: [],
    solution: [],
    understood: [],
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

/* const getWords: ProcessStep = chain(({
  input, config, sanitized, ...inferred
}: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({
      ...inferred, input, config, sanitized, words: words as NonEmptyArray<string>,
    } as Inferred)
    : left({ input, config, errors: [getError(6)] } as ProcessError);
});
 */
export const getWords: ProcessStep = chain(({
  input, config, sanitized, ...inferred
}: Inferred) => {
  const authWords = getAuthorizedWords(config);
  const words = extractMatchedWords(authWords, sanitized);
  return words.length
    ? right({
      ...inferred, input, config, sanitized, words: words as NonEmptyArray<string>,
    } as Inferred)
    : left({ input, config, errors: [getError(6)] } as ProcessError);
});

export const checkWords: ProcessStep = chain(({
  input, config, sanitized, words, ...inferred
}: Inferred) => {
  const unknownWords = checkAllFound(words, sanitized);
  return unknownWords.length
    ? left({ input, config, errors: [getError(7, unknownWords)] } as ProcessError)
    : right({
      ...inferred, input, config, sanitized, words,
    });
});

export const parse = pipe(checkArgs, clean, getWords, checkWords);

// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
