import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { Concept } from '../processor/models';

export const shrdluCommands: NonEmptyArray<Concept> = [
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
