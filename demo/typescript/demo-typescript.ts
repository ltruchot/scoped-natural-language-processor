import {
  process, Concept, Inferred, ProcessError,
} from 'scoped-natural-language-processor';

export const commands: Array<Concept> = [
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

const [err, res]: [ProcessError, Inferred] = process(commands, 'create a blue box two meters left');
if (!err) {
  console.log(res);
} else {
  console.error(err);
}
