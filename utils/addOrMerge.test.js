import { addOrMerge } from './addOrMerge';

const sliceOfState = {
    one: { letters: 'abc', nums: 123 },
    two: { letters: 'def', nums: 456 },
    three: { letters: 'ghi', nums: 789 }
};

describe('addOrMerge', () => {
    test(`doesn't mutate the object passed into it, but returns a new object instead`, () => {
        const newData = {
            four: { letters: 'jkl', nums: 101112 },
        };
        const added = addOrMerge(sliceOfState, newData);
        expect(sliceOfState.hasOwnProperty('four')).toBe(false);
        expect(added.hasOwnProperty('four')).toBe(true);
    });
    test(`merges objects into their counterparts without losing the extra props on the original`, () => {
        const newData = {
            two: { letters: 'jkl' },
            three: { nums: 101112 }
        };
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'jkl', nums: 456 },
            three: { letters: 'ghi', nums: 101112 }
        }
        expect(addOrMerge(sliceOfState, newData)).toEqual(expected);
    });
    test(`adds an object if an object with that key didn't exist on the target`, () => {
        const newData = {
            four: { letters: 'jkl', nums: 101112 },
            five: { letters: 'mno', nums: 131415 }
        };
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'def', nums: 456 },
            three: { letters: 'ghi', nums: 789 },
            four: { letters: 'jkl', nums: 101112 },
            five: { letters: 'mno', nums: 131415 }
        };
        expect(addOrMerge(sliceOfState, newData)).toEqual(expected);
    });
    test(`maintains the same merging behaviour when a single object and _id are supplied`, () => {
        const newData = { letters: 'jkl' };
        const _id = 'three';
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'def', nums: 456 },
            three: { letters: 'jkl', nums: 789 }
        };
        expect(addOrMerge(sliceOfState, newData, _id)).toEqual(expected);
    });
    test(`maintains the same adding behaviour when a single object and _id are supplied`, () => {
        const newData = { letters: 'jkl', nums: 101112 };
        const _id = 'four';
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'def', nums: 456 },
            three: { letters: 'ghi', nums: 789 },
            four: { letters: 'jkl', nums: 101112 }
        };
        expect(addOrMerge(sliceOfState, newData, _id)).toEqual(expected);
    });
});