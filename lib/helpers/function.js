"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = function (fn) {
    var argN = fn.length;
    var final = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < argN) {
            return exports.curry((_a = fn).bind.apply(_a, __spreadArrays([final], args)));
        }
        return fn.call.apply(fn, __spreadArrays([final], args));
    };
    return final;
};
exports.identity = function (a) { return a; };
exports.pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (val) { return fns.reduce(function (v, f) { return f(v); }, val); };
};
//# sourceMappingURL=function.js.map