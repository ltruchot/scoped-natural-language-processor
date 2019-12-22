const { process } = require('scoped-natural-language-processor');

const sentences = [
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
const [error, result] = process(sentences, 'this cat seems threatening');
if (!error) {
  console.log(result);
}
