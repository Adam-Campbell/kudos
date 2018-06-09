import { sortComments } from './sortComments';

const comments = [
    {
        _id: '123',
        parents: ['123'],
        text: 'This is a top level comment',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:19.252Z'
    },
    {
        _id: '456',
        parents: ['456'],
        text: 'This is another top level comment',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:17.252Z'
    },
    {
        _id: '789',
        parents: ['123', '101112', '789'],
        text: 'This is a reply to a reply',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:24.252Z'
    },
    {
        _id: '101112',
        parents: ['123', '101112'],
        text: 'This is a reply',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:21.252Z'
    },
    {
        _id: '131415',
        parents: ['123', '131415'],
        text: 'This is a sibling reply',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:32.252Z'
    },
    {
        _id: '161718',
        parents: ['456', '161718'],
        text: 'This is a lone reply',
        discussion: 'xyz',
        createdAt: '2018-05-07T16:20:17.252Z'
    },
];

const sortedComments = ['456', '161718', '123', '101112', '789', '131415'];

describe('sortComments', () => {
    test(`sorts the array of comments into a threaded order and returns just the _ids`, () => {
        expect(sortComments(comments)).toEqual(sortedComments);
    });
});