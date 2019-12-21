"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ---- IMPORTS
// npm
var Array_1 = require("fp-ts/lib/Array");
var Eq_1 = require("fp-ts/lib/Eq");
var Option_1 = require("fp-ts/lib/Option");
var function_1 = require("fp-ts/lib/function");
// custom
var object_1 = require("../helpers/object");
// ---- DATA
// errors: static list of possible errors
var errors = [
    {
        code: 0,
        msg: 'input is not a string',
    },
    {
        code: 1,
        msg: 'input string is empty',
    },
    {
        code: 2,
        msg: 'config is not an Array',
    },
    {
        code: 3,
        msg: 'config is empty',
    },
    {
        code: 4,
        msg: 'config is not well formatted',
    },
    {
        code: 5,
        msg: 'input appears to be empty after sanitation',
    }, {
        code: 6,
        msg: "input can't be correctly splitted in words",
    }, {
        code: 7,
        msg: 'unknown word(s)',
    }, {
        code: 8,
        msg: 'No matching concept',
    },
];
// unknownError: the default error when error can't be explain
var unknownError = { code: -1, msg: 'unknown error' };
var propCode = function_1.flow(object_1.prop('code'), Option_1.getOrElse(function () { return -1; }));
var findError = function (n) { return Array_1.findFirst(function (item) { return Eq_1.eqNumber.equals(propCode(item), n); })(errors); };
exports.getError = function (code, data) { return function_1.flow(findError, object_1.inject(data), Option_1.getOrElse(function () { return unknownError; }))(code); };
//# sourceMappingURL=errors.js.map