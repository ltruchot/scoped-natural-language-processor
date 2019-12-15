import { right } from 'fp-ts/lib/Either';

export type Inferred = {
  original: string;
};

type FnInfer = (str: string) => void;
export const infer: FnInfer = (str) => right(str);
