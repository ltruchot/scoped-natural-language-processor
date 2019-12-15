"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fp_ts_ramda_1 = require("fp-ts-ramda");
var Array_1 = require("fp-ts/lib/Array");
var Eq_1 = require("fp-ts/lib/Eq");
var errors = [{
        code: 0,
        msg: 'input is not a string',
    }];
var findByCode = function (n) { return Array_1.findFirst(function (item) { return Eq_1.eqNumber.equals(fp_ts_ramda_1.prop('code', item), n); })(errors); };
exports.getError = function (code) { return findByCode(code); };
//# sourceMappingURL=error.models.js.map