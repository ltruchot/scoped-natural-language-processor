import { Either } from 'fp-ts/lib/Either';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

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
  is: string[];
  contains: Array<string[]>
};

// CustomError: contains failing reason of the process
export type CustomError = {
  code: number;
  msg: string;
  data?: string[];
};

// ProcessError: contains original input, and all the CustomError encountered
export type ProcessError = {
  input: unknown;
  config: unknown;
  errors: NonEmptyArray<CustomError>;
};

// Inferred: the result
export type Inferred = {
  input: string;
  config: NonEmptyArray<Concept>,
  sanitized: string;
  words: string[];
  solution: string[];
  understood: InferredConcept[];
};

export type ProcessStep = (e: Either<ProcessError, Inferred>) => Either<ProcessError, Inferred>;

export type Output = [ProcessError, null] | [null, Inferred];

export type InferredConcept = {
  concept: string;
  value: string | InferredConcept[]
};
