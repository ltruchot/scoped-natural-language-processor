import { right, Either, chain } from 'fp-ts/lib/Either';
import { ProcessError, Inferred, ProcessStep } from './models';

export const infer: ProcessStep = (e) => chain((i) => right(i) as Either<ProcessError, Inferred>)(e);

/*
// understandConcepts:: string -> {[keyOf simple]: string}
export const understandConcepts = (key, words) => {
  const understood = {};

  // computer concept
  const concept = findByKey(key)(concepts);


  // match the first phrase that contains each concept well placed
  const findPath = (parts, understanding) => find((attempt) => pipe(reduce((acc, part) => {
    // this "find" is an "all" process. Stop it on first mismatch.
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
    const val = drop(1, newKey);
    const newConcept = findByKey(val)(concepts);
    if (!newConcept) {
      return {
        ...acc,
        idx: acc.idx + 1,
        continue: false,
      };
    }

    // if new concept is an simple array of choice, check if part is in here
    if (isFlat(newConcept.is)) {
      if (includes(part, newConcept.is)) {
        understanding[newConcept.key] = part;
      }
      return {
        ...acc,
        idx: acc.idx + 1,
        continue: includes(part, newConcept.is),
      };
    }

    // recursion on nested concept
    understanding[newConcept.key] = {};

    const sub = pipe(map((nc) => {
      const newParts = take(nc.length, drop(acc.idx, parts));
      return findPath(newParts, understanding[newConcept.key])([nc]);
    }), firstReal)(newConcept.is);

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

  const solution = findPath(words, understood)(concept.is);


  return { solution, understood };
};
*/
