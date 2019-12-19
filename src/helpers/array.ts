import { curry } from './function';

type FnCompact= <T>(arr: T[]) => T[];
export const compact: FnCompact = (arr) => arr.filter(Boolean);

type FnAll = (item: any) => boolean;
export const all = curry((f: FnAll, arr: any[]): boolean => arr.every(f));

type FnIsStringArray = (arr: any[]) => boolean;
export const isStringArray: FnIsStringArray = (arr) => all((item) => typeof item === 'string', arr);
