import {
  find, pipe, filter, all, not,
} from 'ramda';

type FnCompact= <T>(arr: T[]) => T[];
export const compact: FnCompact = (arr) => filter(Boolean, arr);

type FnIsStringArray = (arr: any[]) => boolean;
export const isNonEmptyStringArray: FnIsStringArray = (arr) => arr.length > 0 && all((item) => typeof item === 'string', arr);


export const isNested = pipe(find(Array.isArray), Boolean);

export const isFlat = pipe(isNested, not);

export const firstReal = find(Boolean);
