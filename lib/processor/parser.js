"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// npm
var Either_1 = require("fp-ts/lib/Either");
var function_1 = require("fp-ts/lib/function");
// domain
var errors_1 = require("./errors");
var sanitizer_1 = require("./sanitizer");
// helpers
var string_1 = require("../helpers/string");
var array_1 = require("../helpers/array");
exports.parse = function (input) {
    if (typeof input !== 'string') {
        return Either_1.left({ input: input, errors: [errors_1.getError(0)] });
    }
    var sanitized = sanitizer_1.sanitize(input);
    if (!sanitized) {
        return Either_1.left({ input: input, errors: [errors_1.getError(1)] });
    }
    return Either_1.right({
        input: input,
        sanitized: sanitized,
        words: [],
    });
};
exports.splitWords = function_1.flow(string_1.replace(/\s+/g, ' '), string_1.trim, string_1.split(' '), array_1.compact);
exports.getWords = function (e) { return Either_1.chain(function (_a) {
    var input = _a.input, sanitized = _a.sanitized;
    var words = exports.splitWords(sanitized);
    return words.length
        ? Either_1.right({ input: input, sanitized: sanitized, words: words })
        : Either_1.left({ input: input, errors: [errors_1.getError(2)] });
})(e); };
// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
//# sourceMappingURL=parser.js.map