import { left } from 'fp-ts/lib/Either';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { getError } from './errors';

import {
  parse, checkAllFound, getAuthorizedWords, extractMatchedWords,
} from './parser';
import { ProcessError, Concept } from './models';
import { sentences } from '../fixtures/sentences';

describe('Parser: Parse method', () => {
  test('Non-string param should return a code 1 error', () => {
    // null input
    const config: unknown = [];
    let input: unknown = null;
    expect(parse(config, input))
      .toEqual(left({ input, config, errors: [getError(0)] } as ProcessError));

    // wrong type input
    input = ['test'];
    expect(parse(config, input))
      .toEqual(left({ input, config, errors: [getError(0)] } as ProcessError));
  });


  test('Empty string param should return a code 1 error', () => {
    // empty input
    const input: unknown = '';
    const config: unknown = [];
    expect(parse(config, input))
      .toEqual(left({ input, config, errors: [getError(1)] } as ProcessError));
  });

  test('Input with unknow words should be discovered', () => {
    const authWords = getAuthorizedWords(sentences as NonEmptyArray<Concept>);
    expect(extractMatchedWords(authWords, 'the cat is blue'));
    const input = 'the cat is blue';
    expect(checkAllFound(authWords, input))
      .toEqual(['blue']);
  });

  test('Input with unknow words should be discovered', () => {
    const authWords = getAuthorizedWords(sentences);
    expect(extractMatchedWords(authWords, 'the cat is blue'))
      .toEqual(['the', 'cat', 'is']);
    expect(extractMatchedWords(authWords, 'grandma calms down'))
      .toEqual(['grandma', 'calms down']);
  });
});
