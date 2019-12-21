"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentences = [
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
//# sourceMappingURL=sentence.js.map