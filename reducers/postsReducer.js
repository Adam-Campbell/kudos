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
                isFetching: false,
                //models: addOrMerge(state.models, action.payload.entities.posts)
            };
        
        case actionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.key]: {
                        ...action.payload.post
                    }
                }
            };

        case actionTypes.FETCH_USER_SUCCESS: 
            return {
                ...state,
                models: addOrMerge(state.models, action.payload.posts)
            };

        // case actionTypes.FETCH_CURRENT_USER_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload.posts)
        //     }

        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state, 
                models: addOrMerge(state.models, action.payload, action.post_id)
            }

        case actionTypes.EDIT_POST_SUCCESS:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload, action.key)
            }

        case actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload.entities.posts)
            }

        // case actionTypes.REPLY_TO_POST_SUCCESS:
        //     return {
        //         ...state,
        //         models: {
        //             ...state.models,
        //             [action.discussion_id]: {
        //                 ...state.models[action.discussion_id],
        //                 commentIds: [...action.sortedComments]
        //             }
        //         }
        //     }

        // case actionTypes.REPLY_TO_COMMENT_SUCCESS:
        //     return {
        //         ...state,
        //         models: {
        //             ...state.models,
        //             [action.discussion_id]: {
        //                 ...state.models[action.discussion_id],
        //                 commentIds: [...action.sortedComments]
        //             }
        //         }
        //     }

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

        default:
            return state;

    }
}

export default postsReducer;