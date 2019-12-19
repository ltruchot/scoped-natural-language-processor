"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.trim = function (s) { return s.trim(); };
exports.replace = ramda_1.curry((function (regex, replacement, str) { return str.replace(regex, replacement); }));
exports.split = ramda_1.curry((function (sep, str) { return str.split(sep); }));
//# sourceMappingURL=string.js.map