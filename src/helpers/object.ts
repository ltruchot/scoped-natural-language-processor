import { some, none, Option } from 'fp-ts/lib/Option';
import { curry } from 'ramda';

type FnProp = <T>(k: string) => (o: {[k:string]: T}) => Option<T>;
export const prop: FnProp = (k) => (o) => (o[k] ? some(o[k]) : none);


export const inject = curry((data: any, obj: any) => (data ? { ...obj, data } : obj));
