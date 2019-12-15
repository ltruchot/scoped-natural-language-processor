import { Option } from 'fp-ts/lib/Option';
export declare type CustomError = {
    code: number;
    msg: string;
};
export declare type ProcessError = {
    input: unknown;
    errors: Array<CustomError>;
};
export declare const getError: (code: number) => Option<CustomError>;
//# sourceMappingURL=error.models.d.ts.map