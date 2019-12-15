import { right } from 'fp-ts/lib/Either';
import { infer } from './inferrer';

describe('Inferer::infer', () => {
  test('Test 1', () => {
    const str = 'draw me a sheep';
    expect(infer(str)).toEqual(right(str));
  });
});
