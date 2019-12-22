import {
  process, Concept, Inferred, ProcessError,
} from 'scoped-natural-language-processor';

const sentences: Concept[] = [
  {
    key: 'sentence',
    is: [
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
    key: 'adjective',
    is: ['gray', 'threatening'],
  },
];
const [error, result]: [ProcessError, Inferred] = process(sentences, 'this cat seems threatening');
if (!error) {
  console.log(result);
}
