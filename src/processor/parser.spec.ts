import { left } from 'fp-ts/lib/Either';
import { getError } from './errors';

import {
  parse, checkAllFound, getAuthorizedWords, extractMatchedWords,
} from './parser';
import { ProcessError } from './models';
import { concepts } from '../fixtures/concepts';

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
    const authWords = getAuthorizedWords(concepts);
    expect(extractMatchedWords(authWords, 'the cat is blue'));
    const input = 'the cat is blue';
    expect(checkAllFound(authWords, input))
      .toEqual(['blue']);
  });

  test('Input with unknow words should be discovered', () => {
    const authWords = getAuthorizedWords(concepts);
    expect(extractMatchedWords(authWords, 'the cat is blue'))
      .toEqual(['the', 'cat', 'is']);
    expect(extractMatchedWords(authWords, 'grandma calms down'))
      .toEqual(['grandma', 'calms down']);
  });
});
