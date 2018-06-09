export const posts = [
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

export const normalizedPosts = {
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

export const comments = [
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

export const sortedComments = ['456', '161718', '123', '101112', '789', '131415'];