import { Either } from 'fp-ts/lib/Either';

// Concept: a record containing a key and a list of nouns
// ex: { key: "color", is: ["red", "green", "blue"] }
// Or a list of list of concepts
/*
 ex:
{
  key: "sentence",
  is [
    ["a", "*subject", "*verb", "*complement"],
    ["an", "*subject", "*verb", "*complement"]
  ]
}
*/
// key concept are prefixed by a star *
// insignificant words arn't

export type Concept = {
  key: string;
  is: string[] | Array<string[]>;
};

// CustomError: contains failing reason of the process
export type CustomError = {
  code: number;
  msg: string;
};

// ProcessError: contains original input, and all the CustomError encountered
export type ProcessError = {
  input: unknown;
  config: unknown;
  errors: Array<CustomError>;
};

// Inferred: the result
export type Inferred = {
  input: string;
  config: Concept[],
  sanitized: string;
  words: string[];
};

export type ProcessStep = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;

export type Output = [ProcessError, null] | [null, Inferred];
