import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const initialState = {
    isFetching: false,
    models: {}
};




/*
The shape of one user is as follows:
{
    avatar: either null or a string,
    memberSince: UTC date string,
    _id: string,
    username: string,
    email: string,
    isFullProfile: boolean, indicates whether the full profile has been fetched, or only the properties
                   listed above,
    followers: num,
    following: num,
    posts: an array containing id references to the users posts,
    comments: an array containing id references to the users comments,
    kudos: an array containing id references to the users kudos,
    highlights: an array containing id references to the users highlights
}

*/

const usersReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.user_id]: {
                        ...state.models[action.meta.user_id],
                        fetchedAt: action.meta.timestamp,
                        isFullProfile: true
                    }
                }
            }

        case actionTypes.GIVE_KUDOS_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.currentUser_id]: {
                        ...state.models[action.meta.currentUser_id],
                        kudosIds: [...state.models[action.meta.currentUser_id].kudosIds, action.payload]
                    }
                }
            };

        case actionTypes.REMOVE_KUDOS_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.currentUser_id]: {
                        ...state.models[action.meta.currentUser_id],
                        kudosIds: [
                            ...state.models[action.meta.currentUser_id].kudosIds.filter(kudos => {
                                return kudos !== action.payload
                            })
                        ]
                    }
                }
            };

        case actionTypes.STORE_COMMENT: 
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.author_id]: {
                        ...state.models[action.meta.author_id],
                        commentIds: state.models[action.meta.author_id] ?
                        [...state.models[action.author_id].commentIds, action.payload.comment_id] :
                        [action.payload.comment_id]
                    }
                }
            }

        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                models: {
                    ...state.models,
                    [action.meta.author_id]: {
                        ...state.models[action.meta.author_id],
                        commentIds: state.models[action.meta.author_id].commentIds ?
                                    [
                                        ...state.models[action.meta.author_id].commentIds.filter(_id => {
                                            return _id !== action.payload.comment_id
                                        })
                                    ] :
                                    []
                    }
                }
            }

        case actionTypes.STORE_USERS:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload)
            }

        case actionTypes.STORE_CURRENT_USER:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload, action.meta.entityKey)
            }

        case actionTypes.STORE_CURRENT_USERS_HIGHLIGHTS:
            return {
                ...state,
                models: addOrMerge(state.models, {highlightIds: action.payload.result}, action.meta.entityKey)
            }

        case actionTypes.STORE_CURRENT_USERS_KUDOS:
            return {
                ...state,
                models: addOrMerge(state.models, {kudosIds: action.payload.result}, action.meta.entityKey)
            }

        case actionTypes.STORE_USER:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload, action.meta.user_id)
            }

        case actionTypes.STORE_USERS_FOLLOWERS:
            return {
                ...state,
                models: addOrMerge(state.models, action.payload, action.meta.user_id)
            }

        case actionTypes.STORE_USERS_POSTS:
            return {
                ...state,
                models: addOrMerge(state.models, {postIds: action.payload}, action.meta.user_id)
            }

        case actionTypes.STORE_USERS_COMMENTS:
            return {
                ...state,
                models: addOrMerge(state.models, {commentIds: action.payload}, action.meta.user_id)
            }

        case actionTypes.STORE_USERS_KUDOS:
            return {
                ...state,
                models: addOrMerge(state.models, {kudosIds: action.payload}, action.meta.user_id)
            }

        case actionTypes.STORE_USERS_HIGHLIGHTS:
            return {
                ...state, 
                models: addOrMerge(state.models, {highlightIds: action.payload}, action.meta.user_id)
            }

        default:
            return state;
    }
}

export default usersReducer;
