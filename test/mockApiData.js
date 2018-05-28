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
// const commentss = [
//     {
//         "_id": "5af07cc3379293218cd365ad",
//         "parents": [
//             "5af07cc3379293218cd365ad"
//         ],
//         "text": "Why would you store things as base64? It adds ~30% overhead iirc",
//         "author": {
//             "_id": "5af07cc0379293218cd36593",
//             "avatar": "http://localhost:5000/andrea-profile.jpg",
//             "username": "andrea white",
//             "email": "test@test.co.uk",
//             "bio": "Hi I'm Andrea!",
//             "memberSince": "2018-05-07T16:20:16.689Z",
//             "__v": 0
//         },
//         "discussion": "5af07cc3379293218cd365a1",
//         "createdAt": "2018-05-07T16:20:19.252Z",
//         "updatedAt": "2018-05-07T16:20:19.252Z",
//         "__v": 0
//     },
//     {
//         "_id": "5af07cc3379293218cd365b1",
//         "parents": [
//             "5af07cc3379293218cd365b1"
//         ],
//         "text": "store images as raw data on filesystem, don't use base64 for storing. Store only the link to the image in your DB.",
//         "author": {
//             "_id": "5af07cc0379293218cd36595",
//             "avatar": "http://localhost:5000/rebecca-profile.jpg",
//             "username": "rebecca headley",
//             "email": "bex@test.info",
//             "bio": "Rebecca is my name!",
//             "memberSince": "2018-05-07T16:20:16.694Z",
//             "__v": 0
//         },
//         "discussion": "5af07cc3379293218cd365a1",
//         "createdAt": "2018-05-07T16:20:19.252Z",
//         "updatedAt": "2018-05-07T16:20:19.252Z",
//         "__v": 0
//     },
//     {
//         "_id": "5af07cc3379293218cd365b3",
//         "parents": [
//             "5af07cc3379293218cd365b1",
//             "5af07cc3379293218cd365b3"
//         ],
//         "text": "While this doesn't sound to apply to OP's scenario, sometimes you don't have a persistent file storage available and storing small images in database might make sense. Think of a containerized chat application where users can select their own profile picture and setting up a persistent file system just for that functionality would add overhead. Keeping things simple.",
//         "author": {
//             "_id": "5af07cc0379293218cd36594",
//             "avatar": "http://localhost:5000/mark-profile.jpg",
//             "username": "mark ericson",
//             "email": "mark@test.net",
//             "bio": "My name is Mark",
//             "memberSince": "2018-05-07T16:20:16.694Z",
//             "__v": 0
//         },
//         "discussion": "5af07cc3379293218cd365a1",
//         "createdAt": "2018-05-07T16:20:19.253Z",
//         "updatedAt": "2018-05-07T16:20:19.253Z",
//         "__v": 0
//     },
//     {
//         "_id": "5af07cc3379293218cd365b5",
//         "parents": [
//             "5af07cc3379293218cd365b1",
//             "5af07cc3379293218cd365b3",
//             "5af07cc3379293218cd365b5"
//         ],
//         "text": "Setting up some form of static hosting is always worth it. Don't forget that when you put the images inside the API response as base64 it becomes impossible to cache in HTTP protocol level and you have to cache those images manually in the browser. If you have graphQL apollo client to help you with that-why not. GraphQL makes it effortles. If you don't-you better set up that static file hosting because with REST it's quite a lot of pain.",
//         "author": {
//             "_id": "5af07cc0379293218cd36595",
//             "avatar": "http://localhost:5000/rebecca-profile.jpg",
//             "username": "rebecca headley",
//             "email": "bex@test.info",
//             "bio": "Rebecca is my name!",
//             "memberSince": "2018-05-07T16:20:16.694Z",
//             "__v": 0
//         },
//         "discussion": "5af07cc3379293218cd365a1",
//         "createdAt": "2018-05-07T16:20:19.254Z",
//         "updatedAt": "2018-05-07T16:20:19.254Z",
//         "__v": 0
//     }
// ]