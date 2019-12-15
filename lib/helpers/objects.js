"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("fp-ts/lib/Option");
exports.prop = function (k) { return function (o) { return (o[k] ? Option_1.some(o[k]) : Option_1.none); }; };
//# sourceMappingURL=objects.js.map