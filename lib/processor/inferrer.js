"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
exports.infer = function (e) { return Either_1.chain(function (i) { return Either_1.right(i); }); };
//# sourceMappingURL=inferrer.js.map