declare type FnTrim = (s: string) => string;
export declare const trim: FnTrim;
export declare const replace: {
    (a: RegExp, b: string, c: string): string;
    (a: RegExp, b: string): (a: string) => string;
    (a: RegExp): {
        (a: string, b: string): string;
        (a: string): (a: string) => string;
    };
};
export declare const split: {
    (a: string, b: string): string[];
    (a: string): (a: string) => string[];
};
export {};
//# sourceMappingURL=string.d.ts.map