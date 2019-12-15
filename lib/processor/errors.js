"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ---- IMPORTS
// npm
var Array_1 = require("fp-ts/lib/Array");
var Eq_1 = require("fp-ts/lib/Eq");
var Option_1 = require("fp-ts/lib/Option");
var function_1 = require("fp-ts/lib/function");
// custom
var objects_1 = require("../helpers/objects");
// ---- DATA
// errors: static list of possible errors
var errors = [
    {
        code: 0,
        msg: 'input is not a string',
    }, {
        code: 1,
        msg: 'input is empty',
    },
];
// unknownError: the default error when error can't be explain
var unknownError = { code: -1, msg: 'unknown error' };
var propCode = function_1.flow(objects_1.prop('code'), Option_1.getOrElse(function () { return -1; }));
var findError = function (n) { return Array_1.findFirst(function (item) { return Eq_1.eqNumber.equals(propCode(item), n); })(errors); };
exports.getError = function (code) { return function_1.flow(findError, Option_1.getOrElse(function () { return unknownError; }))(code); };
//# sourceMappingURL=errors.js.map