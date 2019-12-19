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
var Either_1 = require("fp-ts/lib/Either");
var ramda_1 = require("ramda");
var array_1 = require("../helpers/array");
var errors_1 = require("./errors");
var debug_1 = require("../helpers/debug");
exports.infer = Either_1.chain(function (_a) {
    var config = _a.config, words = _a.words, inferred = __rest(_a, ["config", "words"]);
    var findConcept = function (val) { return ramda_1.find(ramda_1.pipe(ramda_1.prop('key'), ramda_1.equals(val)), config); };
    var understood = {};
    var solution = [];
    // match the first phrase that contains each concept well placed
    var findPath = function (parts, understanding) { return ramda_1.find(function (attempt) { return ramda_1.pipe(ramda_1.reduce(function (acc, part) {
        // this "find" is an "all" process. Stop it on first mismatch.
        solution = attempt;
        if (!acc.continue) {
            return acc;
        }
        // if a subpattern was previously found, ignore parts until the words concerned are clear
        if (acc.ignore) {
            return __assign(__assign({}, acc), { ignore: acc.ignore - 1 });
        }
        // "attempt" represent a serie of concept like ["a", "*color", "*shape"]
        // get the new key, like "a", "*color", "*shape"
        var newKey = attempt[acc.idx];
        // new key doesn't exist, go next
        if (!newKey) {
            return __assign(__assign({}, acc), { idx: acc.idx + 1, continue: false });
        }
        // new key doesn't begin with star: it's simple concept like "a"
        if ((ramda_1.head(newKey) !== '*')) {
            return __assign(__assign({}, acc), { idx: acc.idx + 1, continue: newKey === part });
        }
        // new key begin with star: check if this new concept exists
        var val = ramda_1.drop(1, newKey);
        var newConcept = findConcept(val);
        if (!newConcept) {
            return __assign(__assign({}, acc), { idx: acc.idx + 1, continue: false });
        }
        // if new concept is an simple array of choice, check if part is in here
        if (array_1.isFlat(newConcept.is)) {
            if (ramda_1.includes(part, newConcept.is)) {
                // eslint-disable-next-line no-param-reassign
                understanding[newConcept.key] = part;
            }
            return __assign(__assign({}, acc), { idx: acc.idx + 1, continue: ramda_1.includes(part, newConcept.is) });
        }
        // recursion on nested concept
        // eslint-disable-next-line no-param-reassign
        understanding[newConcept.key] = {};
        var sub = ramda_1.pipe(ramda_1.map(function (nc) {
            var newParts = ramda_1.take(nc.length, ramda_1.drop(acc.idx, parts));
            return findPath(newParts, understanding[newConcept.key])([nc]);
        }), array_1.firstReal)(newConcept.is);
        return __assign(__assign({}, acc), { continue: !!sub, idx: acc.idx + 1, ignore: sub ? sub.length - 1 : 0 });
    }, {
        continue: true,
        parts: parts,
        idx: 0,
        ignore: 0,
    }), ramda_1.prop('continue'))(parts); }); };
    var isFound = ramda_1.pipe(ramda_1.map(ramda_1.prop('key')), debug_1.log, ramda_1.map(findConcept), ramda_1.map(ramda_1.prop('is')), debug_1.log, ramda_1.any(findPath(words, understood)))(config);
    console.log(isFound, solution, understood);
    return isFound
        ? Either_1.right(__assign(__assign({}, inferred), { words: words, config: config, solution: solution, understood: understood }))
        : Either_1.left(__assign(__assign({}, inferred), { config: config, errors: [errors_1.getError(7)] }));
});
//# sourceMappingURL=inferrer.js.map