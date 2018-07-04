import * as actionTypes from '../../actionTypes';
import { rootApiUrl } from '../../globalConstants';
import { handleNormalize, fetchData, sortComments, objectToArray } from '../../utils';
import { 
    storePost, 
    storeUsers, 
    storeComments,
    storePostsComment_ids,
    storePostsKudos
} from '../documentActions';

const fetchPostsInfo = post_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts/${post_id}`);
        const normalizedResponse = handleNormalize(response, 'post');
        dispatch(storePost(normalizedResponse.entities.posts[post_id], post_id));
        dispatch(storeUsers(normalizedResponse.entities.users));
        return Promise.resolve();
    } catch (err) {
      return err;  
    }
}

const fetchPostsComments = post_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts/${post_id}/comments`);
        const normalizedResponse = handleNormalize(response, 'comments');
        dispatch(storeUsers(normalizedResponse.entities.users));
        dispatch(storeComments(normalizedResponse.entities.comments));
        dispatch(storePostsComment_ids(
            sortComments(objectToArray({...normalizedResponse.entities.comments})),
            post_id
        ));
        return Promise.resolve();
    } catch (err) {
        console.log(err);
      return err;  
    }
}

const fetchPostsKudos = post_id => async dispatch => {
    try {
        const response = await fetchData(`${rootApiUrl}/api/posts/${post_id}/kudos`);
        dispatch(storePostsKudos(response.kudos, post_id));
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

const fetchPostFailed = error => ({
    type: actionTypes.FETCH_POST_FAILED,
    error
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