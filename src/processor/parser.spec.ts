import { left } from 'fp-ts/lib/Either';
import { getError } from './errors';

import { parse } from './parser';

describe('Parser: Parse method', () => {
  test('Non-string param should return a code 0 error', () => {
    let input = null;
    expect(parse(input))
      .toEqual(left({ input, errors: [getError(0)] }));

    input = ['test'];
    expect(parse(input))
      .toEqual(left({ input, errors: [getError(0)] }));
  });


  test('Empty string param should return a code 1 error', () => {
    const input = '';
    expect(parse(input))
      .toEqual(left({ input, errors: [getError(1)] }));
  });
});
