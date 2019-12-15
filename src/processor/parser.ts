import { Either, left, right } from 'fp-ts/lib/Either';

import { ProcessError, getError } from './errors';
import { sanitize } from './sanitizer';
import { Inferred } from './inferrer';


type FnParse = (input: unknown) => Either<ProcessError, Inferred>;
export const parse: FnParse = (input) => {
  if (typeof input !== 'string') {
    return left({ input, errors: [getError(0)] });
  }
  const original = sanitize(input);
  if (!original) {
    return left({ input, errors: [getError(1)] });
  }
  return right({
    input,
    original,
  });
};
