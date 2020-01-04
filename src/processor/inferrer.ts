import {
  right, chain, left,
} from 'fp-ts/lib/Either';
import {
  pipe, take, drop, map, prop, reduce, find, head, equals, includes, any,
} from 'ramda';
import {
  Inferred, ProcessStep, ProcessError, InferredConcept,
} from './models';
import { firstReal } from '../helpers/array';
import { getError } from './errors';
import { Concept } from '..';


export const infer: ProcessStep = chain(({
  config, words, ...inferred
}) => {
  const findConcept = (val: string): Concept | undefined => find(pipe(prop<any, any>('key'), equals(val)), config);
  const understood: InferredConcept[] = [];
  let solution: string[] = [];


  // match the first phrase that contains each concept well placed
  const findPath: any = (parts: any, understanding: InferredConcept[]) => find((attempt: any) => pipe(reduce((acc, part) => {
    // this "find" is an "all" process. Stop it on first mismatch.
    solution = attempt;
    if (!acc.continue) {
      return acc;
    }

    // if a subpattern was previously found, ignore parts until the words concerned are clear
    if (acc.ignore) {
      return {
        ...acc,
        ignore: acc.ignore - 1,
      };
    }

    // "attempt" represent a serie of concept like ["a", "*color", "*shape"]
    // get the new key, like "a", "*color", "*shape"
    const newKey = attempt[acc.idx];

    // new key doesn't exist, go next
    if (!newKey) {
      return {
        ...acc,
        idx: acc.idx + 1,
        continue: false,
      };
    }

    // new key doesn't begin with star: it's simple concept like "a"
    if ((head(newKey) !== '*')) {
      return {
        ...acc,
        idx: acc.idx + 1,
        continue: newKey === part,
      };
    }

    // new key begin with star: check if this new concept exists
    const val: any = drop(1, newKey);
    const newConcept = findConcept(val);
    if (!newConcept) {
      return {
        ...acc,
        idx: acc.idx + 1,
        continue: false,
      };
    }

    // if new concept is an simple array of choice, check if part is in here
    if (newConcept.is.length) {
      const isValidConcept = includes(part, newConcept.is);
      const wasAlreadyFound = understanding.find((c) => c.concept === newConcept.key);
      if (isValidConcept && !wasAlreadyFound) {
        understanding.push({ concept: newConcept.key, value: part as string });
      }

      return {
        ...acc,
        idx: acc.idx + 1,
        continue: includes(part, newConcept.is),
      };
    }

    // recursion on nested concept
    // eslint-disable-next-line no-param-reassign
    const subConcept: InferredConcept[] = [];
    understanding.push({ concept: newConcept.key, value: subConcept });

    const sub: any = pipe(map((nc: any) => {
      const newParts = take(nc.length, drop(acc.idx, parts));
      return findPath(newParts, subConcept)([nc]);
    }), firstReal)((newConcept as any).contains);

    return {
      ...acc,
      continue: !!sub,
      idx: acc.idx + 1,
      ignore: sub ? sub.length - 1 : 0,
    };
  }, {
    continue: true,
    parts,
    idx: 0,
    ignore: 0,
  }), prop('continue'))(parts));

  const isFound: any = pipe(
    map<any, any>(prop('key')),
    map(findConcept),
    map<any, any>(a => a.is.length ? a.is : a.contains),
    any(findPath(words, understood)),
  )(config);
  return isFound
    ? right({
      ...inferred, words, config, solution, understood,
    } as Inferred)
    : left({ ...inferred, config, errors: [getError(8)] } as ProcessError);
});
