const { process } = require('scoped-natural-language-processor');

const sentences = [
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
    contains: [],
  },
  {
    key: 'subject',
    is: ['cat', 'sky', 'grandma'],
    contains: [],
  },
  {
    key: 'linkingVerb',
    is: ['is', 'seems', 'becomes'],
    contains: [],
  },
  {
    key: 'intransitiveVerb',
    is: ['sings', 'calms down'],
    contains: [],
  },
  {
    key: 'adjective',
    is: ['gray', 'threatening'],
    contains: [],
  },
];

const [error, result] = process(sentences, 'this cat seems threatening');
if (!error) {
  console.log(result);
} else {
  console.error(error);
}

const commands = [
  {
    key: 'command',
    is: [],
    contains: [
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
    contains: [],
  },
  {
    key: 'shape',
    is: ['box', 'boxes', 'cone', 'cones', 'pyramid', 'pyramids', 'cylinder', 'cylinders', 'sphere', 'spheres'],
    contains: [],
  },
  {
    key: 'place',
    is: [],
    contains: [
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
    contains: [],
  },
  {
    key: 'number',
    is: ['a', 'an', 'one', 'two', 'three'],
    contains: [],
  },
  {
    key: 'color',
    is: ['red', 'green', 'blue'],
    contains: [],
  },
  {
    key: 'direction',
    is: ['top', 'bottom', 'left', 'right', 'front', 'back'],
    contains: [],
  },
];


const [err, res] = process(commands, 'create a blue box two meters left');
if (!err) {
  console.log(res);
} else {
  console.error(err);
}
