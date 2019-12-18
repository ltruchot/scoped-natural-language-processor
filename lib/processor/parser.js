"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// ---- IMPORTS
// npm
var Either_1 = require("fp-ts/lib/Either");
var function_1 = require("fp-ts/lib/function");
// domain
var errors_1 = require("./errors");
var sanitizer_1 = require("./sanitizer");
// helpers
var string_1 = require("../helpers/string");
var array_1 = require("../helpers/array");
var checkArgs = function (config, input) {
    var errors = [];
    if (typeof input !== 'string') {
        errors.push(errors_1.getError(0));
    }
    // TODO: deep check of config
    if (!Array.isArray(config)) {
        errors.push(errors_1.getError(1));
    }
    return errors.length
        ? Either_1.left({ input: input, config: config, errors: errors })
        : Either_1.right({
            input: input,
            config: config,
            sanitized: '',
            words: [],
        });
};
var clean = Either_1.chain(function (_a) {
    var input = _a.input, config = _a.config, rest = __rest(_a, ["input", "config"]);
    var sanitized = sanitizer_1.sanitize(input);
    return sanitized
        ? Either_1.right(__assign(__assign({ input: input, config: config }, rest), { sanitized: sanitized }))
        : Either_1.left({ input: input, config: config, errors: [errors_1.getError(3)] });
});
var splitWords = function_1.flow(string_1.replace(/\s+/g, ' '), string_1.trim, string_1.split(' '), array_1.compact);
var getWords = Either_1.chain(function (_a) {
    var input = _a.input, config = _a.config, sanitized = _a.sanitized;
    var words = splitWords(sanitized);
    return words.length
        ? Either_1.right({
            input: input, config: config, sanitized: sanitized, words: words,
        })
        : Either_1.left({ input: input, config: config, errors: [errors_1.getError(3)] });
});
exports.parse = function_1.flow(checkArgs, clean, getWords);
// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
//# sourceMappingURL=parser.js.map