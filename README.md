# Scoped Natural Language Processor

An input/output natural language interpreter written in TypeScript. It takes a configuration and a sentence, then it return a tree of concepts and values.

## Installation

## Use
Basic use example:
```typescript
import{ process } from "scoped-natural-language-processor";
const config = [
  {
    key: 'sentence',
    is: [
      ['*subject', '*linkingVerb', '*adjective'],
      ['*subject', '*intransitiveVerb'],
    ],
  },
  {
    key: 'subject',
    is: ['this cat', 'the sky', 'grandma'],
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
const [error, result] = process(config, 'this cat is gray');
```

## Licences
[CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/): you can use/copy/modify any code but only without commercial intentions.