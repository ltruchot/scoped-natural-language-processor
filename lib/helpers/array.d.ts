declare type FnCompact = <T>(arr: T[]) => T[];
export declare const compact: FnCompact;
declare type FnAll = (item: any) => boolean;
export declare const all: import("./function").Curry2<FnAll, any[], boolean>;
declare type FnIsStringArray = (arr: any[]) => boolean;
export declare const isStringArray: FnIsStringArray;
export {};
//# sourceMappingURL=array.d.ts.map