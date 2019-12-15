"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var errors_1 = require("./errors");
var sanitizer_1 = require("./sanitizer");
exports.parse = function (input) {
    if (typeof input !== 'string') {
        return Either_1.left({ input: input, errors: [errors_1.getError(0)] });
    }
    var original = sanitizer_1.sanitize(input);
    if (!original) {
        return Either_1.left({ input: input, errors: [errors_1.getError(1)] });
    }
    return Either_1.right({
        input: input,
        original: original,
    });
};
//# sourceMappingURL=parser.js.map