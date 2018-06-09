import { handleNormalize } from './handleNormalize';

const posts = [
    {
        category: ['categoryOne'],
        _id: '123',
        title: 'Post one',
        text: 'The first post',
        author: {
            _id: 'abc',
            name: 'author one'
        }
    },
    {
        category: ['categoryTwo'],
        _id: '456',
        title: 'Post two',
        text: 'The second post',
        author: {
            _id: 'def',
            name: 'author two'
        }
    }
];

const normalizedPosts = {
    entities: {
        users: {
            abc: {
                _id: 'abc',
                name: 'author one'
            },
            def: {
                _id: 'def',
                name: 'author two'
            }
        },
        posts: {
            '123': {
                category: ['categoryOne'],
                _id: '123',
                title: 'Post one',
                text: 'The first post',
                author: 'abc'
            },
            '456': {
                category: ['categoryTwo'],
                _id: '456',
                title: 'Post two',
                text: 'The second post',
                author: 'def'
            }
        }
    },
    result: ['123', '456']
}

describe('handleNormalize', () => {
    test(`throws an error if the required arguments aren't supplied`, () => {
        expect(() => handleNormalize({})).toThrow(
            'You have failed to supply one or more of the required arguments to the handleNormalize function.'
        );
    });
    test(`throws an error if the resourceType supplied isn't valid`, () => {
        expect(() => handleNormalize({}, 'foobars')).toThrow(
            'You have supplied an invalid resource type to the handleNormalize function.'
        );
    });
    test(`correctly normalizes the data if the arguments are valid`, () => {
        expect(handleNormalize(posts, 'posts')).toEqual(normalizedPosts);
    });
});