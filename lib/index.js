"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("fp-ts/lib/function");
var parser_1 = require("./processor/parser");
var inferrer_1 = require("./processor/inferrer");
exports.process = function_1.flow(parser_1.parse, parser_1.getWords, inferrer_1.infer);
console.log(exports.process('Draw    me a sheep  '));
//# sourceMappingURL=index.js.map