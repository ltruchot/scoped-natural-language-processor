import { parse } from './parser';
import { infer } from './inferrer';

describe('Inferer::infer', () => {
  test('Test 1', () => {
    const parsed = parse([], 'Draw me a sheep');
    expect(infer(parsed)).toEqual(parsed);
  });
});
