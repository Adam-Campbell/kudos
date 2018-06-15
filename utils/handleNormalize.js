import { normalize, schema } from 'normalizr';

/*

Handles all normalization of data, all of the desired schemas are stored inside the scope of this module.
When calling the function, the first argument supplied will be the data you wish to normalize, and the second
argument will be a string describing the type of data. The valid values for the string are the property names
found on the schemaTypes object:

post - a post
posts - an array of posts
comments - an array of comments
kudos - an array of kudos
highlights - an array of highlights

*/

const deserializeComment = comment => ({
    ...comment,
    text: JSON.parse(comment.text)
});

const deserializePost = post => ({
    ...post,
    text: JSON.parse(post.text)

});


//const user = new schema.Entity('users', {}, {idAttribute: '_id', processStrategy: decorateUser});
const user = new schema.Entity('users', {}, {idAttribute: '_id'});
const post = new schema.Entity('posts', {author: user}, {idAttribute: '_id', processStrategy: deserializePost});
const comment = new schema.Entity('comments', {author: user}, {idAttribute: '_id', processStrategy: deserializeComment});
const aKudos = new schema.Entity('kudos', {post: post}, {idAttribute: '_id'});
const highlight = new schema.Entity('highlights', {post: post, user: user}, {idAttribute: '_id'});
const posts = [ post ];
const comments = [ comment ];
const kudos = [ aKudos ];
const highlights = [ highlight ]; 
const users = [ user ]; 

const schemaTypes = {
    posts: posts,
    post: post,
    comments: comments,
    kudos: kudos,
    highlights: highlights,
    users: users
};

export const handleNormalize = (data, resourceType) => { 
    if (!data || !resourceType) {
        throw new Error('You have failed to supply one or more of the required arguments to the handleNormalize function.');
        return;
    }
    if (!schemaTypes.hasOwnProperty(resourceType)) {
        throw new Error ('You have supplied an invalid resource type to the handleNormalize function.');
        return;
    }
    return normalize(data, schemaTypes[resourceType])
};
















// const decorateUser = value => ({
//     isFullProfile: false,
//     followers: null,
//     following: null,
//     postIds: [],
//     commentIds: [],
//     kudosIds: [],
//     highlightIds: [],
//     ...value
// });

// const normalizePosts = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id', processStrategy: decorateUser});
//     const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
//     const postListSchema = [ postSchema ];
//     return normalize(data, postListSchema);
// };

// const normalizePosts = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id'});
//     const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
//     const postListSchema = [ postSchema ];
//     return normalize(data, postListSchema);
// };

// const normalizePost = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id', processStrategy: decorateUser});
//     const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
//     return normalize(data, postSchema); 
// };


// const normalizeComments = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id'});
//     const commentSchema = new schema.Entity('comments', {author: userSchema}, {idAttribute: '_id'});
//     const commentListSchema = [ commentSchema ];
//     return normalize(data, commentListSchema);
// }


// const normalizeKudos = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id'});
//     const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
//     const kudosSchema = new schema.Entity('kudos', {post: postSchema}, {idAttribute: '_id'});
//     const kudosListSchema = [ kudosSchema ];
//     return normalize(data, kudosListSchema);
// }

// const normalizeHighlights = data => {
//     const userSchema = new schema.Entity('users', {}, {idAttribute: '_id'});
//     const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
//     const highlightSchema = new schema.Entity('highlights', {post: postSchema, user: userSchema}, {idAttribute: '_id'});
//     const highlightListSchema = [ highlightSchema ];
//     return normalize(data, highlightListSchema);
// }





// const userSchema = new schema.Entity('users', {}, {idAttribute: '_id', processStrategy: decorateUser});
// const userSchema = new schema.Entity('users', {}, {idAttribute: '_id'});
// const postSchema = new schema.Entity('posts', {author: userSchema}, {idAttribute: '_id'});
// const postListSchema = [ postSchema ];
// const commentSchema = new schema.Entity('comments', {author: userSchema}, {idAttribute: '_id'});
// const commentListSchema = [ commentSchema ];
// const kudosSchema = new schema.Entity('kudos', {post: postSchema}, {idAttribute: '_id'});
// const kudosListSchema = [ kudosSchema ];
// const highlightSchema = new schema.Entity('highlights', {post: postSchema, user: userSchema}, {idAttribute: '_id'});
// const highlightListSchema = [ highlightSchema ];