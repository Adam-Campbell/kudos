import { objectToArray } from './objectToArray';

const objectOfObjects = {
    one: { _id: 'abc' },
    two: { _id: 'def' },
    three: { _id: 'ghi' }
};

const arrayOfObjects = objectToArray(objectOfObjects);

describe('objectToArray', () => {
    test(`returns an array`, () => {
        expect(Array.isArray(arrayOfObjects)).toBe(true);
    });
    test(`contains the properties of the object passed to it`, () => {
        for (const prop in objectOfObjects) {
            expect(arrayOfObjects.findIndex(el => el._id === objectOfObjects[prop]._id))
            .not.toBe(-1);
        }
    });
    test(`doesn't add anything extra to the array`, () => {
        expect(arrayOfObjects).toHaveLength(3);
    });
});