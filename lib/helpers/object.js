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
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("fp-ts/lib/Option");
var ramda_1 = require("ramda");
exports.prop = function (k) { return function (o) { return (o[k] ? Option_1.some(o[k]) : Option_1.none); }; };
exports.inject = ramda_1.curry(function (data, obj) { return (data ? __assign(__assign({}, obj), { data: data }) : obj); });
//# sourceMappingURL=object.js.map