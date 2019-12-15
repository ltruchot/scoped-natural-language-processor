"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dompurify_1 = __importDefault(require("dompurify"));
var jsdom_1 = require("jsdom");
var win = typeof window === 'undefined' ? (new jsdom_1.JSDOM('')).window : window;
var dp = dompurify_1.default(win);
exports.sanitize = dp.sanitize;
//# sourceMappingURL=sanitizer.js.map