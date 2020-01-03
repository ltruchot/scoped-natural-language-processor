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
const [error1, result1] = process(sentences, 'this cat seems threatening');
if (!error1) {
  console.log(result1);
}

const commands = [
  {
    key: 'command',
    is: [
      ['*verb', '*number', '*shape'],
      ['*verb', '*number', '*color', '*shape'],
      ['*verb', '*number', '*shape', '*place'],
      ['*verb', '*number', '*color', '*shape', '*place'],
    ],
  },
  {
    key: 'verb',
    is: [
      'create',
    ],
  },
  {
    key: 'shape',
    is: ['box', 'boxes', 'cone', 'cones', 'pyramid', 'pyramids', 'cylinder', 'cylinders', 'sphere', 'spheres'],
  },
  {
    key: 'place',
    is: [
      ['*direction'],
      ['to', '*direction'],
      ['to', 'the', '*direction'],
      ['on', '*direction', 'of'],
      ['on', 'the', '*direction', 'of'],
      ['*number', '*unit', '*direction'],
      ['*number', '*unit', 'to', '*direction'],
      ['*number', '*unit', 'to', 'the', '*direction'],
    ],
  },
  {
    key: 'unit',
    is: ['meter', 'meters'],
  },
  {
    key: 'number',
    is: ['a', 'an', 'one', 'two', 'three'],
  },
  {
    key: 'color',
    is: ['red', 'green', 'blue'],
  },
  {
    key: 'direction',
    is: ['top', 'bottom', 'left', 'right', 'front', 'back'],
  },
];


const [error2, result2] = process(commands, 'create a blue box two meters left');
if (!error2) {
  console.log(result2);
}
