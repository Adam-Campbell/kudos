import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const initialState = {};

const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        // case actionTypes.FETCH_USER_SUCCESS:
        //     return {
        //         ...state,
        //         ...action.payload.comments
        //     };

        // case actionTypes.FETCH_POST_SUCCESS:
        //     return {
        //         ...state,
        //         ...action.payload.comments
        //     };

        // case actionTypes.REPLY_TO_POST_SUCCESS:
        //     return {
        //         ...state, 
        //         [action.comment_id]: { ...action.payload }
        //     };

        // case actionTypes.REPLY_TO_COMMENT_SUCCESS:
        //     return {
        //         ...state,
        //         [action.comment_id]: { ...action.payload }
        //     };

        case actionTypes.STORE_COMMENT:
            return {
                ...state,
                [action.payload.comment_id]: action.payload.comment
            }

        case actionTypes.STORE_COMMENTS: {
            return addOrMerge(state, action.payload)
        }

        case actionTypes.DELETE_COMMENT_SUCCESS:
            return addOrMerge(state, action.payload.comment, action.payload.comment_id)

        case actionTypes.EDIT_COMMENT_SUCCESS:
            return addOrMerge(state, action.payload, action.meta.comment_id)

        default:
            return state;
    }
}

export default commentsReducer;