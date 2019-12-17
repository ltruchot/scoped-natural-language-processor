import { curry } from './function';

// returns a string without whitespace from both ends
type FnTrim = (s: string) => string;
export const trim: FnTrim = (s) => s.trim();

// returns a string with a replacement.
type FnReplace = (regex: RegExp, replacement: string, str: string) => string;
export const replace = curry(
  ((regex, replacement, str) => str.replace(regex, replacement)) as FnReplace,
);

// returns an list of strings based on separator
type FnSplit = (sep: string, str: string) => string[];
export const split = curry(
  ((sep, str) => str.split(sep)) as FnSplit,
);
