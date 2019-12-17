type FnCompact= <T>(arr: T[]) => T[];
export const compact: FnCompact = (arr) => arr.filter(Boolean);
