import { some, none, Option } from 'fp-ts/lib/Option';

type FnProp = <T>(k: string) => (o: {[k:string]: T}) => Option<T>;
export const prop: FnProp = (k) => (o) => (o[k] ? some(o[k]) : none);
