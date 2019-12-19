import { prop } from 'ramda';
import { process } from '.';
import { Inferred } from './processor/models';

const config = [
  {
    key: 'sentence',
    is: [
      ['*subject', '*intransitiveVerb'],
      ['*article', '*subject', '*intransitiveVerb'],
      ['*subject', '*linkingVerb', '*adjective'],
      ['*article', '*subject', '*linkingVerb', '*adjective'],
    ],
  },
  {
    key: 'article',
    is: ['this', 'the', 'a'],
  },
  {
    key: 'subject',
    is: ['cat', 'sky', 'grandma'],
  },
  {
    key: 'linkingVerb',
    is: ['is', 'seems', 'becomes'],
  },
  {
    key: 'intransitiveVerb',
    is: ['sings', 'calms down'],
  },
  {
    key: 'adjective',
    is: ['gray', 'threatening'],
  },
];

// TODO: multiword case like "calms down"
describe('Processor::process', () => {
  test('Process 0 on one level', () => {
    const [error, result] = process(config, 'grandma sings');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      intransitiveVerb: 'sings',
    });
  });
  test('Process 1 on one level', () => {
    const [error, result] = process(config, 'grandma is threatening');
    expect(error).toBeNull();
    expect(prop('understood', result as Inferred)).toEqual({
      subject: 'grandma',
      linkingVerb: 'is',
      adjective: 'threatening',
    });
  });
  test('Process 2 on one level', () => {
    const [error, result] = process(config, 'this cat seems gray');
    expect(error).toBeNull();

    expect(prop('understood', result as Inferred)).toEqual({
      article: 'this',
      subject: 'cat',
      linkingVerb: 'seems',
      adjective: 'gray',
    });
  });
});
