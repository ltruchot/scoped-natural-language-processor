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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// ---- IMPORTS
// npm
var Either_1 = require("fp-ts/lib/Either");
var ramda_1 = require("ramda");
// domain
var errors_1 = require("./errors");
var sanitizer_1 = require("./sanitizer");
// helpers
var array_1 = require("../helpers/array");
exports.getAuthorizedWords = function (concepts) {
    var words = ramda_1.pipe(ramda_1.reduce(function (acc, cur) { return __spreadArrays(acc, ramda_1.flatten(cur.is)); }, []), ramda_1.uniq, ramda_1.filter(function (item) { return ramda_1.head(item) !== '*'; }))(concepts);
    return words;
};
var splitWords = ramda_1.pipe(ramda_1.replace(/\s+/g, ' '), ramda_1.trim, ramda_1.split(' '), array_1.compact);
exports.extractMatchedWords = function (authWords, str, foundWords) {
    if (foundWords === void 0) { foundWords = []; }
    var splitted = splitWords(str);
    var _loop_1 = function (i) {
        var wds = ramda_1.pipe(ramda_1.take(i + 1), ramda_1.join(' '))(splitted);
        var found = authWords.find(function (w) { return w === wds; });
        if (found) {
            foundWords.push(found);
            var newStr = ramda_1.pipe(ramda_1.drop(i + 1), ramda_1.join(' '))(splitted);
            if (newStr) {
                return { value: exports.extractMatchedWords(authWords, newStr, foundWords) };
            }
            return out_i_1 = i, "break";
        }
        // let retry, droping a word
        if (i + 1 === splitted.length) {
            splitted.shift();
            i = -1;
        }
        out_i_1 = i;
    };
    var out_i_1;
    // eslint-disable-next-line no-plusplus
    for (var i = 0; i < splitted.length; i++) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object")
            return state_1.value;
        if (state_1 === "break")
            break;
    }
    return foundWords;
};
exports.checkAllFound = function (wds, sentence) { return ramda_1.pipe(ramda_1.sort(function (a, b) { return b.length - a.length; }), ramda_1.reduce(function (acc, cur) { return acc.replace(new RegExp("\\b(" + cur + ")\\b"), '#|#'); }, sentence), ramda_1.split('#|#'), ramda_1.map(ramda_1.trim), array_1.compact)(wds); };
var checkArgs = function (config, input) {
    // input should be a string
    if (typeof input !== 'string') {
        return Either_1.left({ input: input, config: config, errors: [errors_1.getError(0)] });
    }
    // input should not be empty
    if (input === '') {
        return Either_1.left({ input: input, config: config, errors: [errors_1.getError(1)] });
    }
    // config should be an Array
    if (!Array.isArray(config)) {
        return Either_1.left({ input: input, config: config, errors: [errors_1.getError(2)] });
    }
    // config shouldn't be empty
    if (config.length === 0) {
        return Either_1.left({ input: input, config: config, errors: [errors_1.getError(3)] });
    }
    // config should be well formatted
    var isValidConfig = ramda_1.all(function (item) { return item.key
        && Array.isArray(item.is)
        && (array_1.isNonEmptyStringArray(item.is) || ramda_1.all(array_1.isNonEmptyStringArray, item.is)); });
    if (!isValidConfig(config)) {
        return Either_1.left({ input: input, config: config, errors: [errors_1.getError(4)] });
    }
    return Either_1.right({
        input: input,
        config: config,
        sanitized: '',
        words: [],
        solution: [],
        understood: {},
    });
};
var clean = Either_1.chain(function (_a) {
    var input = _a.input, config = _a.config, rest = __rest(_a, ["input", "config"]);
    var sanitized = sanitizer_1.sanitize(input);
    return sanitized
        ? Either_1.right(__assign(__assign({ input: input, config: config }, rest), { sanitized: sanitized }))
        : Either_1.left({ input: input, config: config, errors: [errors_1.getError(5)] });
});
/* const getWords: ProcessStep = chain(({
  input, config, sanitized, ...inferred
}: Inferred) => {
  const words = splitWords(sanitized);
  return words.length
    ? right({
      ...inferred, input, config, sanitized, words: words as NonEmptyArray<string>,
    } as Inferred)
    : left({ input, config, errors: [getError(6)] } as ProcessError);
});
 */
exports.getWords = Either_1.chain(function (_a) {
    var input = _a.input, config = _a.config, sanitized = _a.sanitized, inferred = __rest(_a, ["input", "config", "sanitized"]);
    var authWords = exports.getAuthorizedWords(config);
    var words = exports.extractMatchedWords(authWords, sanitized);
    return words.length
        ? Either_1.right(__assign(__assign({}, inferred), { input: input, config: config, sanitized: sanitized, words: words }))
        : Either_1.left({ input: input, config: config, errors: [errors_1.getError(6)] });
});
exports.checkWords = Either_1.chain(function (_a) {
    var input = _a.input, config = _a.config, sanitized = _a.sanitized, words = _a.words, inferred = __rest(_a, ["input", "config", "sanitized", "words"]);
    var unknownWords = exports.checkAllFound(words, sanitized);
    return unknownWords.length
        ? Either_1.left({ input: input, config: config, errors: [errors_1.getError(7, unknownWords)] })
        : Either_1.right(__assign(__assign({}, inferred), { input: input, config: config, sanitized: sanitized, words: words }));
});
exports.parse = ramda_1.pipe(checkArgs, clean, exports.getWords, exports.checkWords);
// for multi errors
// @see https://dev.to/gcanti/getting-started-with-fp-ts-either-vs-validation-5eja
//# sourceMappingURL=parser.js.map