import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';
import { handleNormalize, sortComments, objectToArray } from '../utils';
import Router from 'next/router';
import { 
    storePosts, 
    storePost, 
    storeUsers, 
    storeComments,
    storePostsForCategory, 
    updateIdsForCategory,
    storePostsComment_ids,
    storePostsKudos,
} from './documentActions';

const fetchPostsRequest = () => ({
    type: actionTypes.FETCH_POSTS_REQUEST
});

const fetchPostsSuccess = () => ({
    type: actionTypes.FETCH_POSTS_SUCCESS
});

// const fetchPostsSuccess = (data, timestamp) => ({
//     type: actionTypes.FETCH_POSTS_SUCCESS,
//     payload: data,
//     timestamp: timestamp
// });

const fetchPostsFailed = err => ({
    type: actionTypes.FETCH_POSTS_FAILED,
    payload: err
});

export const fetchPosts = () => async dispatch => {
    dispatch(fetchPostsRequest());
    try {
        const response = await fetch(`${rootApiUrl}/api/posts`);
        const responseJSON = await response.json();
        const normalizedResponse = handleNormalize(responseJSON, 'posts');
        const timestamp = Date.now();
        console.log(normalizedResponse);
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(updateIdsForCategory(normalizedResponse.result, 'all', timestamp));
        dispatch(fetchPostsSuccess());
    } catch (err) {
        console.log(err);
        dispatch(fetchPostsFailed(err));
    }
}



const fetchCategoriesPostsRequest = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_REQUEST
});

const fetchCategoriesPostsSuccess = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS
});

// const fetchCategoriesPostsSuccess = (posts, category, timestamp) => ({
//     type: actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS,
//     payload: posts,
//     key: category,
//     timestamp: timestamp 
// });

const fetchCategoriesPostsFailed = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_FAILED
});

export const fetchCategoriesPosts = category => async dispatch => {
    dispatch(fetchCategoriesPostsRequest());
    try {
        const response = await fetch(`${rootApiUrl}/api/posts?category=${category}`);
        const responseJSON = await response.json();
        const normalizedResponse = handleNormalize(responseJSON, 'posts');
        const timestamp = Date.now();
        dispatch(
            storePostsForCategory(
                normalizedResponse.entities.posts,
                normalizedResponse.result,
                category,
                timestamp
            )
        );
        dispatch(storePosts(normalizedResponse.entities.posts));
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(updateIdsForCategory(normalizedResponse.result, 'all', timestamp,));
        dispatch(fetchCategoriesPostsSuccess());
        // dispatch(
        //     fetchCategoriesPostsSuccess(handleNormalize(postsJSON, 'posts'), category, Date.now())
        // );
    } catch (err) {
        dispatch(fetchCategoriesPostsFailed());
    }
} 


const fetchPostsInfo = post_id => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/posts/${post_id}`);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        const normalizedResponse = handleNormalize(responseJSON, 'post');
        dispatch(storePost(normalizedResponse.entities.posts[post_id], post_id));
        dispatch(storeUsers(normalizedResponse.entities.users));
        return Promise.resolve();
    } catch (err) {
      return err;  
    }
}

const fetchPostsComments = post_id => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/posts/${post_id}/comments`);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        const normalizedResponse = handleNormalize(responseJSON, 'comments');
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeComments(normalizedResponse.entities.comments));
        dispatch(storePostsComment_ids(normalizedResponse.result, post_id));
        return Promise.resolve();
    } catch (err) {
        console.log(err);
      return err;  
    }
}

const fetchPostsKudos = post_id => async dispatch => {
    try {
        const response = await fetch(`${rootApiUrl}/api/posts/${post_id}/kudos`);
        if (!response.ok) {
            return Promise.reject();
        }
        const responseJSON = await response.json();
        dispatch(storePostsKudos(responseJSON.kudos, post_id));
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

const fetchPostRequest = () => ({
    type: actionTypes.FETCH_POST_REQUEST
});

const fetchPostSuccess = (post_id, timestamp) => ({
    type: actionTypes.FETCH_POST_SUCCESS,
    meta: {
        post_id,
        timestamp
    }
});

const fetchPostFailed = err => ({
    type: actionTypes.FETCH_POST_FAILED,
    payload: err
});

export const fetchPost = post_id => async dispatch => {
    dispatch(fetchPostRequest());

    const promiseArr = [
        dispatch(fetchPostsInfo(post_id)),
        dispatch(fetchPostsComments(post_id)),
        dispatch(fetchPostsKudos(post_id))
    ];

    return Promise.all(promiseArr)
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchPostSuccess(post_id, timestamp));
    }, (err) => {
        dispatch(fetchPostFailed(err));
    });
}
















// const fetchPostInfo = async _id => {
//     try {
//         const response = await fetch(`${rootApiUrl}/api/posts/${_id}`);
//         if (!response.ok) {
//             return Promise.reject();
//         }
//         const responseJSON = await response.json();
//         const normalized =  handleNormalize(responseJSON, 'post');
//         console.log(normalized);
//         return normalized;
//     } catch (err) {
//       return err;  
//     }
// }

// const fetchPostComments = async _id => {
//     try {
//         const comments = await fetch(`${rootApiUrl}/api/posts/${_id}/comments`);
//         if (!comments.ok) {
//             return Promise.reject();
//         }
//         const commentsJSON = await comments.json();
//         return handleNormalize(commentsJSON, 'comments');
//     } catch (err) {
//       return err;  
//     }
// }

// const fetchPostKudos = async _id => {
//     try {
//         const kudos = await fetch(`${rootApiUrl}/api/posts/${_id}/kudos`);
//         if (!kudos.ok) {
//             return Promise.reject();
//         }
//         const kudosJSON = await kudos.json();
//         return kudosJSON;
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }


// const fetchPostRequest = () => ({
//     type: actionTypes.FETCH_POST_REQUEST
// });

// const fetchPostSuccess = (_id, data) => ({
//     type: actionTypes.FETCH_POST_SUCCESS,
//     key: _id,
//     payload: data
// });

// const fetchPostFailed = err => ({
//     type: actionTypes.FETCH_POST_FAILED,
//     payload: err
// });

// export const fetchPost = _id => async dispatch => {
//     dispatch(fetchPostRequest());
//     try {
//         const postReq = fetchPostInfo(_id);
//         const commentsReq = fetchPostComments(_id);
//         const kudosReq = fetchPostKudos(_id);
//         const post = await postReq;
//         const comments = await commentsReq;
//         const kudos = await kudosReq;
        
//         const fetchPostResults = {
//             post: {
//                 ...post.entities.posts[_id],
//                 commentIds: sortComments(objectToArray({...comments.entities.comments})),
//                 kudos: kudos.kudos,
//                 isFullPost: true,
//                 fetchedAt: Date.now()
//             },
//             users: {
//                 ...post.entities.users,
//                 ...comments.entities.users
//             },
//             comments: {
//                 ...comments.entities.comments
//             }
//         };

//         dispatch(fetchPostSuccess(_id, fetchPostResults));
//     } catch (err) {
//         dispatch(fetchPostFailed(err));
//     }
// }




const createPostRequest = () => ({
    type: actionTypes.CREATE_POST_REQUEST
});

const createPostSuccess = (post_id, category, currentUser_id) => ({
    type: actionTypes.CREATE_POST_SUCCESS,
    meta: {
        post_id,
        category,
        currentUser_id
    }
});

const createPostFailed = () => ({
    type: actionTypes.CREATE_POST_FAILED
});


export const createPost = (articleObject, currentUser_id, token) => async dispatch => {
    dispatch(createPostRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(articleObject)
    }
    try {
        const response = await fetch(`${rootApiUrl}/api/posts`, settings);
        if (!response.ok) {
            return dispatch(createPostFailed());
        }
        const responseJSON = await response.json();
        const newPost_id = responseJSON._id;
        const newPostCategory = responseJSON.category;
        dispatch(storePost(responseJSON, newPost_id));
        dispatch(createPostSuccess(newPost_id, newPostCategory, currentUser_id));
        Router.push(`/post?post=${newPost_id}`, `/post/${newPost_id}`);
    } catch (err) {
        console.log(err);
    }
}






// const createPostRequest = () => ({
//     type: actionTypes.CREATE_POST_REQUEST
// });

// const createPostSuccess = (post, _id, category, post_id) => ({
//     type: actionTypes.CREATE_POST_SUCCESS,
//     payload: post,
//     key: _id,
//     category,
//     post_id
// });

// const createPostFailed = () => ({
//     type: actionTypes.CREATE_POST_FAILED
// });


// export const createPost = (articleObject, currentUser_id, token) => async dispatch => {
//     dispatch(createPostRequest());
//     const settings = {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         method: 'post',
//         body: JSON.stringify(articleObject)
//     }
//     try {
//         const createPostReq = await fetch(`${rootApiUrl}/api/posts`, settings);
//         if (!createPostReq.ok) {
//             return dispatch(createPostFailed());
//         }
//         const postJSON = await createPostReq.json();
//         const newPost_id = postJSON._id;
//         //postJSON.text = JSON.parse(postJSON.text);
//         const newPostCategory = postJSON.category;
//         dispatch(createPostSuccess(postJSON, currentUser_id, newPostCategory, newPost_id));
//         Router.push(`/post?post=${newPost_id}`, `/post/${newPost_id}`);
//     } catch (err) {
//         console.log(err);
//     }
// }

const updateCategoryPostIds = (oldCategory, newCategory, post_id) => ({
    type: actionTypes.UPDATE_CATEGORY_POST_IDS,
    meta: {
        oldCategory,
        newCategory,
        post_id
    }
});


const editPostRequest = () => ({
    type: actionTypes.EDIT_POST_REQUEST
});

// const editPostSuccess = (post, post_id) => ({
//     type: actionTypes.EDIT_POST_SUCCESS,
//     payload: post,
//     key: _id
// });

const editPostSuccess = () => ({
    type: actionTypes.EDIT_POST_SUCCESS
});

const editPostFailed = () => ({
    type: actionTypes.EDIT_POST_FAILED
});



export const editPost = (articleObject, post_id, oldCategory, newCategory, token) => async dispatch => {
    dispatch(editPostRequest());
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(articleObject)
    }
    try {
        const response = await fetch(`${rootApiUrl}/api/posts/${post_id}`, settings);
        if (!response.ok) {
            return dispatch(editPostFailed());
        }
        const responseJSON = await response.json();
        responseJSON.author = responseJSON.author._id;
        dispatch(storePost(responseJSON, post_id));
        if (oldCategory !== newCategory) {
            dispatch(updateCategoryPostIds(oldCategory, newCategory, post_id));
        }
        dispatch(editPostSuccess());
        Router.push(`/post?post=${post_id}`, `/post/${post_id}/`);
    } catch (err) {
        console.log(err);
    }
}
