import * as actionTypes from '../actionTypes';
import fetch from 'isomorphic-fetch';
import { rootApiUrl } from '../globalConstants';
import { handleNormalize, sortComments, objectToArray } from '../utils';
import Router from 'next/router';

const fetchPostsRequest = () => ({
    type: actionTypes.FETCH_POSTS_REQUEST
});

const fetchPostsSuccess = (data, timestamp) => ({
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: data,
    timestamp: timestamp
});

const fetchPostsFailed = err => ({
    type: actionTypes.FETCH_POSTS_FAILED,
    payload: err
});



export const fetchPosts = () => async dispatch => {
    dispatch(fetchPostsRequest());
    try {
        const posts = await fetch(`${rootApiUrl}/api/posts`);
        const postsJSON = await posts.json();
        dispatch(
            fetchPostsSuccess(handleNormalize(postsJSON, 'posts'), Date.now())
        );
    } catch (err) {
        dispatch(fetchPostsFailed());
    }
}

const fetchCategoriesPostsRequest = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_REQUEST
});

const fetchCategoriesPostsSuccess = (posts, category, timestamp) => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS,
    payload: posts,
    key: category,
    timestamp: timestamp 
});

const fetchCategoriesPostsFailed = () => ({
    type: actionTypes.FETCH_CATEGORIES_POSTS_FAILED
});

export const fetchCategoriesPosts = category => async dispatch => {
    dispatch(fetchCategoriesPostsRequest());
    try {
        const posts = await fetch(`${rootApiUrl}/api/posts?category=${category}`);
        const postsJSON = await posts.json();
        dispatch(
            fetchCategoriesPostsSuccess(handleNormalize(postsJSON, 'posts'), category, Date.now())
        );
    } catch (err) {
        dispatch(fetchCategoriesPostsFailed());
    }
} 

const fetchPostInfo = async _id => {
    try {
        const postInfo = await fetch(`${rootApiUrl}/api/posts/${_id}`);
        if (!postInfo.ok) {
            return Promise.reject();
        }
        const postInfoJSON = await postInfo.json();
        return handleNormalize(postInfoJSON, 'post');
    } catch (err) {
      return err;  
    }
}

const fetchPostComments = async _id => {
    try {
        const comments = await fetch(`${rootApiUrl}/api/posts/${_id}/comments`);
        if (!comments.ok) {
            return Promise.reject();
        }
        const commentsJSON = await comments.json();
        return handleNormalize(commentsJSON, 'comments');
    } catch (err) {
      return err;  
    }
}

const fetchPostKudos = async _id => {
    try {
        const kudos = await fetch(`${rootApiUrl}/api/posts/${_id}/kudos`);
        if (!kudos.ok) {
            return Promise.reject();
        }
        const kudosJSON = await kudos.json();
        return kudosJSON;
    } catch (err) {
        return Promise.reject(err);
    }
}


const fetchPostRequest = () => ({
    type: actionTypes.FETCH_POST_REQUEST
});

const fetchPostSuccess = (_id, data) => ({
    type: actionTypes.FETCH_POST_SUCCESS,
    key: _id,
    payload: data
});

const fetchPostFailed = err => ({
    type: actionTypes.FETCH_POST_FAILED,
    payload: err
});

export const fetchPost = _id => async dispatch => {
    dispatch(fetchPostRequest());
    try {
        const postReq = fetchPostInfo(_id);
        const commentsReq = fetchPostComments(_id);
        const kudosReq = fetchPostKudos(_id);
        const post = await postReq;
        const comments = await commentsReq;
        const kudos = await kudosReq;
        
        const fetchPostResults = {
            post: {
                ...post.entities.posts[_id],
                commentIds: sortComments(objectToArray({...comments.entities.comments})),
                kudos: kudos.kudos,
                isFullPost: true,
                fetchedAt: Date.now()
            },
            users: {
                ...post.entities.users,
                ...comments.entities.users
            },
            comments: {
                ...comments.entities.comments
            }
        };

        dispatch(fetchPostSuccess(_id, fetchPostResults));
    } catch (err) {
        dispatch(fetchPostFailed(err));
    }
}


const createPostRequest = () => ({
    type: actionTypes.CREATE_POST_REQUEST
});

const createPostSuccess = (post, _id, category, post_id) => ({
    type: actionTypes.CREATE_POST_SUCCESS,
    payload: post,
    key: _id,
    category,
    post_id
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
        const createPostReq = await fetch(`${rootApiUrl}/api/posts`, settings);
        if (!createPostReq.ok) {
            return dispatch(createPostFailed());
        }
        const postJSON = await createPostReq.json();
        const newPost_id = postJSON._id;
        //postJSON.text = JSON.parse(postJSON.text);
        postJSON.titleRaw = JSON.parse(postJSON.titleRaw);
        postJSON.descriptionRaw = JSON.parse(postJSON.descriptionRaw);
        postJSON.bodyRaw = JSON.parse(postJSON.bodyRaw);
        postJSON.image = JSON.parse(postJSON.image);
        const newPostCategory = postJSON.category;
        dispatch(createPostSuccess(postJSON, currentUser_id, newPostCategory, newPost_id));
        Router.push(`/post?post=${newPost_id}`, `/post/${newPost_id}`);
    } catch (err) {
        console.log(err);
    }
}

const updateCategoryPostIds = (oldCategory, newCategory, post_id) => ({
    type: actionTypes.UPDATE_CATEGORY_POST_IDS,
    oldCategory,
    newCategory,
    post_id
});


const editPostRequest = () => ({
    type: actionTypes.EDIT_POST_REQUEST
});

const editPostSuccess = (post, _id) => ({
    type: actionTypes.EDIT_POST_SUCCESS,
    payload: post,
    key: _id
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
        const editPostReq = await fetch(`${rootApiUrl}/api/posts/${post_id}`, settings);
        if (!editPostReq.ok) {
            return dispatch(editPostFailed());
        }
        const editedPostJSON = await editPostReq.json();
        editedPostJSON.author = editedPostJSON.author._id;
        //editedPostJSON.text = JSON.parse(editedPostJSON.text);
        editedPostJSON.titleRaw = JSON.parse(editedPostJSON.titleRaw);
        editedPostJSON.descriptionRaw = JSON.parse(editedPostJSON.descriptionRaw);
        editedPostJSON.bodyRaw = JSON.parse(editedPostJSON.bodyRaw);
        editedPostJSON.image = JSON.parse(editedPostJSON.image);
        const editedPost_id = editedPostJSON._id;
        dispatch(editPostSuccess(editedPostJSON, post_id));
        if (oldCategory !== newCategory) {
            dispatch(updateCategoryPostIds(oldCategory, newCategory, post_id));
        }
        Router.push(`/post?post=${editedPost_id}`, `/post/${editedPost_id}/`);
    } catch (err) {
        console.log(err);
    }
}
