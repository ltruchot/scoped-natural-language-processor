// ---- IMPORTS
// npm
import { findFirst } from 'fp-ts/lib/Array';
import { eqNumber } from 'fp-ts/lib/Eq';
import { Option, getOrElse } from 'fp-ts/lib/Option';
import { flow } from 'fp-ts/lib/function';

// custom
import { prop } from '../helpers/object';
import { CustomError } from './models';

// ---- DATA
// errors: static list of possible errors
const errors: Array<CustomError> = [
  {
    code: 0,
    msg: 'input is not a string',
  },
  {
    code: 1,
    msg: 'config is not a valid array of concept',
  },
  {
    code: 2,
    msg: 'input is empty',
  }, {
    code: 3,
    msg: "input can't be correctly splitted in words",
  },
];

// unknownError: the default error when error can't be explain
const unknownError: CustomError = { code: -1, msg: 'unknown error' };

// ---- COMPUTATIONS
// propCode the number that the key "code" should contain in object
type FnPropCode = (o: { ['code']: number }) => number;
const propCode: FnPropCode = flow(
  prop<number>('code'),
  getOrElse(() => -1),
);

// findError: returns an CustomError from our static list of error
type FnFindError = (n: number) => Option<CustomError>;
const findError: FnFindError = (n) => findFirst((item: any) => eqNumber.equals(propCode(item), n))(errors);

type FnGetError = (code:number) => CustomError;
export const getError: FnGetError = (code) => flow(
  findError, getOrElse(() => unknownError),
)(code);
