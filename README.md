# Scoped Natural Language Processor

An input/output natural language interpreter written in TypeScript. It takes a configuration and a sentence, then it return a tree of concepts and values.

## Installation

## Use
Basic use example:
```typescript
import{ process } from "scoped-natural-language-processor";
export const sentences: NonEmptyArray<Concept> = [
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
const [error, result] = process(config, 'this cat seems threatening');
console.log(result); 
/*
{
  article: 'the',
  subject: 'cat',
  linkingVerb: 'is',
  adjective: 'threatening',
}
*/
```

## Licences
[CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/): you can use/copy/modify any code but only without commercial intentions.