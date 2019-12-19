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
//# sourceMappingURL=index.js.map