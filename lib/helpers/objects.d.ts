import { Option } from 'fp-ts/lib/Option';
declare type FnProp = <T>(k: string) => (o: {
    [k: string]: T;
}) => Option<T>;
export declare const prop: FnProp;
export {};
//# sourceMappingURL=objects.d.ts.map