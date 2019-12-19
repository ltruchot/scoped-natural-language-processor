"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("fp-ts/lib/function");
var Either_1 = require("fp-ts/lib/Either");
var parser_1 = require("./processor/parser");
var inferrer_1 = require("./processor/inferrer");
var l = function (val) { return [val, null]; };
var r = function (val) { return [null, val]; };
var foldProcess = function (e) { return Either_1.fold(l, r)(e); };
exports.process = function_1.flow(parser_1.parse, inferrer_1.infer, foldProcess);
/* console.log(process([], 'Draw    me a sheep  '));
console.log(process([], '')); */
var config = [
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
var _a = exports.process(config, 'this cat is gray'), error = _a[0], result = _a[1];
console.log(result || error);
//# sourceMappingURL=index.js.map