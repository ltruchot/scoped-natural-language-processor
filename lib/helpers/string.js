"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.trim = function (s) { return s.trim(); };
exports.replace = function_1.curry((function (regex, replacement, str) { return str.replace(regex, replacement); }));
exports.split = function_1.curry((function (sep, str) { return str.split(sep); }));
//# sourceMappingURL=string.js.map