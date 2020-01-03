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
    expect(prop('understood', result as Inferred)).toEqual([
      { concept: 'subject', value: 'grandma' },
      { concept: 'intransitiveVerb', value: 'sings' },
    ]);
  });
  test('Process 1 on one level', () => {
    const [error, result] = process(sentences, 'the sky calms down');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual([
      { concept: 'article', value: 'the' },
      { concept: 'subject', value: 'sky' },
      { concept: 'intransitiveVerb', value: 'calms down' },
    ]);
  });
  test('Process 2 on one level', () => {
    const [error, result] = process(sentences, 'grandma is threatening');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual([
      { concept: 'subject', value: 'grandma' },
      { concept: 'linkingVerb', value: 'is' },
      { concept: 'adjective', value: 'threatening' },
    ]);
  });
  test('Process 3 on one level', () => {
    const [error, result] = process(sentences, 'this cat seems gray');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual([
      { concept: 'article', value: 'this' },
      { concept: 'subject', value: 'cat' },
      { concept: 'linkingVerb', value: 'seems' },
      { concept: 'adjective', value: 'gray' },
    ]);
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
    expect(prop('understood', result as Inferred)).toEqual([
      { concept: 'verb', value: 'create' },
      { concept: 'number', value: 'a' },
      { concept: 'color', value: 'blue' },
      { concept: 'shape', value: 'box' },
      {
        concept: 'place',
        value: [
          { concept: 'number', value: 'two' },
          { concept: 'unit', value: 'meters' },
          { concept: 'direction', value: 'left' },
        ],
      },
    ]);
  });
});
