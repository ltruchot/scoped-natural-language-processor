"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.compact = function (arr) { return arr.filter(Boolean); };
exports.all = function_1.curry(function (f, arr) { return arr.every(f); });
exports.isStringArray = function (arr) { return exports.all(function (item) { return typeof item === 'string'; }, arr); };
//# sourceMappingURL=array.js.map