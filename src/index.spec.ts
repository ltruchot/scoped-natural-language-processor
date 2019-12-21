// npm
import { prop } from 'ramda';

// curstom
import { process } from '.';
import { Inferred } from './processor/models';
import { sentences } from './fixtures/sentences';
import { shrdluCommands } from './fixtures/shrdlu-commands';
import { getError } from './processor/errors';

describe('Processor::process', () => {
  test('Process 0 on one level', () => {
    const [error, result] = process(sentences, 'grandma sings');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      intransitiveVerb: 'sings',
    });
  });
  test('Process 1 on one level', () => {
    const [error, result] = process(sentences, 'the sky calms down');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      article: 'the',
      subject: 'sky',
      intransitiveVerb: 'calms down',
    });
  });
  test('Process 2 on one level', () => {
    const [error, result] = process(sentences, 'grandma is threatening');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      linkingVerb: 'is',
      adjective: 'threatening',
    });
  });
  test('Process 3 on one level', () => {
    const [error, result] = process(sentences, 'this cat seems gray');
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
    const [error] = process(sentences, input);
    expect(error).toEqual({
      input,
      config: sentences,
      errors: [getError(7, ['my', 'might have been'])],
    });
  });
  test('Process 6 on two levels', () => {
    const input = 'create a blue box two meters left';
    const [error, result] = process(shrdluCommands, input);
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      verb: 'create',
      number: 'a',
      color: 'blue',
      shape: 'box',
      place: {
        number: 'two',
        unit: 'meters',
        direction: 'left',
      },
    });
  });
});
