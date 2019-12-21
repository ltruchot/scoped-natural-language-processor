// npm
import { prop } from 'ramda';

// curstom
import { process } from '.';
import { Inferred } from './processor/models';
import { concepts } from './fixtures/concepts';
import { getError } from './processor/errors';

describe('Processor::process', () => {
  test('Process 0 on one level', () => {
    const [error, result] = process(concepts, 'grandma sings');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      intransitiveVerb: 'sings',
    });
  });
  test('Process 1 on one level', () => {
    const [error, result] = process(concepts, 'the sky calms down');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      article: 'the',
      subject: 'sky',
      intransitiveVerb: 'calms down',
    });
  });
  test('Process 2 on one level', () => {
    const [error, result] = process(concepts, 'grandma is threatening');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      linkingVerb: 'is',
      adjective: 'threatening',
    });
  });
  test('Process 3 on one level', () => {
    const [error, result] = process(concepts, 'this cat seems gray');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      article: 'this',
      subject: 'cat',
      linkingVerb: 'seems',
      adjective: 'gray',
    });
  });
  test('Process 4 on one level', () => {
    const input = 'my sky might have been gray';
    const [error] = process(concepts, input);
    expect(error).toEqual({
      input,
      config: concepts,
      errors: [getError(7, ['my', 'might have been'])],
    });
  });
});
