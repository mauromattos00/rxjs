import { ObservableInput, of, asyncScheduler, fromScheduled } from 'rxjs';
import { symbolObservable } from 'rxjs/internal/util/symbolObservable';
import { symbolIterator } from 'rxjs/internal/util/symbolIterator';

export const createObservableInputs = <T>(value: T) => of<ObservableInput<T>>(
  of<T>(value),
  fromScheduled<T>([value], asyncScheduler),
  [value],
  Promise.resolve(value),
  {
    [symbolIterator]: () => {
      const iteratorResults = [
        { value, done: false },
        { done: true }
      ];
      return {
        next: () => {
          return iteratorResults.shift();
        }
      };
    }
  } as any,
  {
    [symbolObservable]: () => of<T>(value)
  } as any
);