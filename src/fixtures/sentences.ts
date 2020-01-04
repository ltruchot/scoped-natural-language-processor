import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { Concept } from '../processor/models';

export const sentences: NonEmptyArray<Concept> = [
  {
    key: 'sentence',
    is: [],
    contains: [
      ['*subject', '*intransitiveVerb'],
      ['*article', '*subject', '*intransitiveVerb'],
      ['*subject', '*linkingVerb', '*adjective'],
      ['*article', '*subject', '*linkingVerb', '*adjective'],
    ],
  },
  {
    key: 'article',
    is: ['this', 'the', 'a'],
    contains: []
  },
  {
    key: 'subject',
    is: ['cat', 'sky', 'grandma'],
    contains: []
  },
  {
    key: 'linkingVerb',
    is: ['is', 'seems', 'becomes'],
    contains: []
  },
  {
    key: 'intransitiveVerb',
    is: ['sings', 'calms down'],
    contains: []
  },
  {
    key: 'adjective',
    is: ['gray', 'threatening'],
    contains: []
  },
];
