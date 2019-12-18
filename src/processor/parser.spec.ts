import { left } from 'fp-ts/lib/Either';
import { getError } from './errors';

import { parse } from './parser';

describe('Parser: Parse method', () => {
  test('Non-string param should return a code 1 error', () => {
    // null input
    const config = [];
    let input = null;
    expect(parse(config, input))
      .toEqual(left({ input, config, errors: [getError(1)] }));

    // wrong type input
    input = ['test'];
    expect(parse(config, input))
      .toEqual(left({ input, config, errors: [getError(1)] }));
  });


  test('Empty string param should return a code 1 error', () => {
    // empty input
    const input = '';
    const config = [];
    expect(parse(config, input))
      .toEqual(left({ input, errors: [getError(2)] }));
  });
});
