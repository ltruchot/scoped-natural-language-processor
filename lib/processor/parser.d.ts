import { Either } from 'fp-ts/lib/Either';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { Inferred, ProcessError, ProcessStep, Concept } from './models';
declare type FnGetAutorizedWords = (concepts: NonEmptyArray<Concept>) => string[];
export declare const getAuthorizedWords: FnGetAutorizedWords;
declare type FnExtractMatchedWords = (authWords: string[], str: string, foundWords?: string[]) => string[];
export declare const extractMatchedWords: FnExtractMatchedWords;
declare type FnCheckAllFound = (wds: string[], sentence: string) => any;
export declare const checkAllFound: FnCheckAllFound;
export declare const getWords: ProcessStep;
export declare const checkWords: ProcessStep;
export declare const parse: (x0: unknown, x1: unknown) => Either<ProcessError, Inferred>;
export {};
//# sourceMappingURL=parser.d.ts.map