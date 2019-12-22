# Scoped Natural Language Processor

An input/output natural language interpreter written in TypeScript. It takes a configuration and a sentence, then it return a tree of concepts and values.

## Installation

```
npm i scoped-natural-language-processor --save 
```

## Use

Basic use example with **TypeScript**:
```typescript
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
/*
{
  article: 'this',
  subject: 'cat',
  linkingVerb: 'seems',
  adjective: 'threatening',
}
*/
```

Basic use example with **JavaScript**:
```javascript
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

/*
{
  article: 'this',
  subject: 'cat',
  linkingVerb: 'seems',
  adjective: 'threatening',
}
*/
```

## Licences
[CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/): you can use/copy/modify any code but only without commercial intentions.