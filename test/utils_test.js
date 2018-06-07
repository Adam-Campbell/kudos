// import { expect } from 'chai'; 
// import {
//     addOrMerge,
//     handleNormalize,
//     objectToArray,
//     sortComments
// } from '../utils';
// import { posts, normalizedPosts, comments, sortedComments } from './mockApiData';

const expect = require('chai').expect;
const { addOrMerge, handleNormalize, objectToArray, sortComments } = require('../utils');
const { posts, normalizedPosts, comments, sortedComments } = require('./mockApiData');

describe('objectToArray', () => {
    const objOfObj = {
        one: { _id: 'abc' },
        two: { _id: 'def' },
        three: { _id: 'ghi' }
    };

    it('should return an array', () => {
        expect(objectToArray(objOfObj)).to.be.an('array').that.is.not.empty;
    });
    it('should contain the properties of the object passed to it', () => {
        for (const prop in objOfObj) {
            expect(objectToArray(objOfObj).findIndex(el => el._id === objOfObj[prop]._id))
            .to.not.equal(-1);
        }
    });
    it('should not add anything extra to the array', () => {
        expect(objectToArray(objOfObj).length).to.equal(3);
    });
});


describe('addOrMerge', () => {

    const sliceOfState = {
        one: { letters: 'abc', nums: 123 },
        two: { letters: 'def', nums: 456 },
        three: { letters: 'ghi', nums: 789 }
    };

    it('should not mutate the object passed into it, but rather return a new object', () => {
        const newData = {
            four: { letters: 'jkl', nums: 101112 },
        };
        const added = addOrMerge(sliceOfState, newData);

        expect(sliceOfState.hasOwnProperty('four')).to.be.false;
        expect(added.hasOwnProperty('four')).to.be.true;
    });

    it('should merge objects into their counterparts without losing the extra props on the original', () => {
        const newData = {
            two: { letters: 'jkl' },
            three: { nums: 101112 }
        };

        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'jkl', nums: 456 },
            three: { letters: 'ghi', nums: 101112 }
        }
        expect(addOrMerge(sliceOfState, newData)).to.deep.equal(expected);
    });

    it("should add an object if an object with that key didn't exist on the target", () => {
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

        expect(addOrMerge(sliceOfState, newData)).to.deep.equal(expected);

    });
    
    it("should maintain the same merging behaviour when a single object and _id are supplied", () => {
        const newData = { letters: 'jkl' };
        const _id = 'three';
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'def', nums: 456 },
            three: { letters: 'jkl', nums: 789 }
        };

        expect(addOrMerge(sliceOfState, newData, _id)).to.deep.equal(expected);
    });

    it("should maintain the same adding behaviour when a single object and _id are supplied", () => {
        const newData = { letters: 'jkl', nums: 101112 };
        const _id = 'four';
        const expected = {
            one: { letters: 'abc', nums: 123 },
            two: { letters: 'def', nums: 456 },
            three: { letters: 'ghi', nums: 789 },
            four: { letters: 'jkl', nums: 101112 }
        };

        expect(addOrMerge(sliceOfState, newData, _id)).to.deep.equal(expected);
    });

});

describe('handleNormalize', () => {
    it("should throw an error if the required arguments aren't supplied", () => {
        expect(() => handleNormalize({})).to.throw('You have failed to supply one or more of the required arguments to the handleNormalize function.');
    });

    it("should throw an error if the resourceType supplied isn't valid", () => {
        expect(() => handleNormalize({}, 'foobars')).to.throw('You have supplied an invalid resource type to the handleNormalize function.');
    });

    it('should correctly normalize data if the arguments are valid', () => {
        expect(handleNormalize(posts, 'posts')).to.deep.equal(normalizedPosts);
    });
});

describe('sort comments', () => {
    it('should an array of comments into a threaded order and return just the ids', () => {
        expect(sortComments(comments)).to.deep.equal(sortedComments);
    });
});
