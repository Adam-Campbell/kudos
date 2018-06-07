import { mergeAndDedupArrays } from './mergeAndDedupArrays';

describe(`mergeAndDedupArrays`, () => {
    test(`outputs an array`, () => {
        const oldArr = [1,2];
        const newArr = [3,4];
        expect(Array.isArray(mergeAndDedupArrays(oldArr, newArr))).toBe(true);
    });
    test(`merges the two input arrays in the order newArr -> oldArr`, () => {
        const oldArr = [1,2];
        const newArr = [3,4];
        expect(mergeAndDedupArrays(oldArr, newArr)).toEqual([3,4,1,2]);
    });
    test(`doesn't add any values from oldArr which are also present in newArr`, () => {
        const oldArr = [1,2,3];
        const newArr = [3,4];
        expect(mergeAndDedupArrays(oldArr, newArr)).toEqual([3,4,1,2]);
    });
});