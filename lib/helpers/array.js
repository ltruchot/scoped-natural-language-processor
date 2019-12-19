"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
exports.compact = function (arr) { return ramda_1.filter(Boolean, arr); };
exports.isNonEmptyStringArray = function (arr) { return arr.length > 0 && ramda_1.all(function (item) { return typeof item === 'string'; }, arr); };
exports.isNested = ramda_1.pipe(ramda_1.find(Array.isArray), Boolean);
exports.isFlat = ramda_1.pipe(exports.isNested, ramda_1.not);
exports.firstReal = ramda_1.find(Boolean);
//# sourceMappingURL=array.js.map