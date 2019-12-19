/// <reference types="ts-toolbelt" />
declare type FnTrim = (s: string) => string;
export declare const trim: FnTrim;
declare type FnReplace = (regex: RegExp, replacement: string, str: string) => string;
export declare const replace: import("Function/Curry").Curry<FnReplace>;
declare type FnSplit = (sep: string, str: string) => string[];
export declare const split: import("Function/Curry").Curry<FnSplit>;
export {};
//# sourceMappingURL=string.d.ts.map