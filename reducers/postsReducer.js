import * as actionTypes from '../actionTypes';
import { addOrMerge, mergeAndDedupArrays } from '../utils';

const initialState = {
    isFetching: false,
    models: {}
};

const postsReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.FETCH_POSTS_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        
        case actionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.post_id]: {
                        ...state.models[action.meta.post_id],
                        isFullPost: true,
                        fetchedAt: action.meta.timestamp
                    }
                }
            };

        case actionTypes.FETCH_USER_SUCCESS: 
            return {
                ...state,
                models: addOrMerge(state.models, action.payload.posts)
            };

        case actionTypes.STORE_COMMENT:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.discussion_id] : {
                        ...state.models[action.meta.discussion_id],
                        commentIds: [...action.payload.sortedComments]
                    }
                }
            }

        case actionTypes.STORE_POSTS:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload)
            }

        case actionTypes.STORE_POST:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload, action.meta.post_id)
            }

        case actionTypes.STORE_POSTS_COMMENT_IDS:
            return {
                ...state,
                models: addOrMerge(state.models, {commentIds: action.payload}, action.meta.post_id)
            }

        case actionTypes.STORE_POSTS_KUDOS:
            return {
                ...state,
                models: addOrMerge(state.models, {kudos: action.payload}, action.meta.post_id)
            }

        default:
            return state;

    }
}

export default postsReducer;