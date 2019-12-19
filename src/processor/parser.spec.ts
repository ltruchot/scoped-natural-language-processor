import { left } from 'fp-ts/lib/Either';
import { getError } from './errors';

import { parse } from './parser';
import { ProcessError } from './models';

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
});
