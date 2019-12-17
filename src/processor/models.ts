// ---- MODELS
// CustomError: contains failing reason of the process
export type CustomError = {
  code: number;
  msg: string;
};

// ProcessError: contains original input, and all the CustomError encountered
export type ProcessError = {
  input: unknown;
  errors: Array<CustomError>
};

// Inferred: the result
export type Inferred = {
  input: any;
  sanitized: string;
  words: string[];
};
