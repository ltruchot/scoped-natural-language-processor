/// <reference types="ts-toolbelt" />
import { Option } from 'fp-ts/lib/Option';
declare type FnProp = <T>(k: string) => (o: {
    [k: string]: T;
}) => Option<T>;
export declare const prop: FnProp;
export declare const inject: import("Function/Curry").Curry<(data: any, obj: any) => any>;
export {};
//# sourceMappingURL=object.d.ts.map