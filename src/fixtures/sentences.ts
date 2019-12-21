import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { Concept } from '../processor/models';

export const sentences: NonEmptyArray<Concept> = [
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
