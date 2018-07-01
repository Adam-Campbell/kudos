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
       
        // case actionTypes.FETCH_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload.entities.users)
        //     }; 

        // case actionTypes.FETCH_POST_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload.users)
        //     }

        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                models: {
                    ...addOrMerge(state.models, action.payload.users),
                    ...addOrMerge(state.models, action.payload.user, action.key)
                }
            }

        // case actionTypes.FETCH_CURRENT_USER_SUCCESS:
        //     return {
        //         ...state,
        //         models: {
        //             ...addOrMerge(state.models, action.payload.users),
        //             ...addOrMerge(state.models, action.payload.currentUser, action.key)
        //         }
        //     }

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

        // case actionTypes.UPDATE_USER_DETAILS_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload.currentUser, action.key)
        //     }

        // case actionTypes.UPDATE_USER_AVATAR_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload, action.key)
        //     }

        // case actionTypes.FETCH_CATEGORIES_POSTS_SUCCESS:
        //     return {
        //         ...state,
        //         models: addOrMerge(state.models, action.payload.entities.users)
        //     }

        // case actionTypes.REPLY_TO_POST_SUCCESS:
        //     return {
        //         ...state,
        //         models: {
        //             ...state.models,
        //             [action.author_id]: {
        //                 ...state.models[action.author_id],
        //                 commentIds: state.models[action.author_id].commentIds ? 
        //                             [...state.models[action.author_id].commentIds, action.comment_id] :
        //                             [action.comment_id]
        //             }
        //         }
        //     }

        // case actionTypes.REPLY_TO_COMMENT_SUCCESS:
        //     return {
        //         ...state,
        //         models: {
        //             ...state.models,
        //             [action.author_id]: {
        //                 ...state.models[action.author_id],
        //                 commentIds: state.models[action.author_id].commentIds ? 
        //                             [...state.models[action.author_id].commentIds, action.comment_id] :
        //                             [action.comment_id]
        //             }
        //         }
        //     }

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

        default:
            return state;
    }
}

export default usersReducer;
