import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const initialState = {};

const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                ...action.payload.comments
            };

        case actionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                ...action.payload.comments
            };

        case actionTypes.REPLY_TO_POST_SUCCESS:
            return {
                ...state, 
                [action.comment_id]: { ...action.payload }
            };

        case actionTypes.REPLY_TO_COMMENT_SUCCESS:
            return {
                ...state,
                [action.comment_id]: { ...action.payload }
            };

        case actionTypes.DELETE_COMMENT_SUCCESS:
            return addOrMerge(state, action.payload, action.comment_id)

        case actionTypes.EDIT_COMMENT_SUCCESS:
            return addOrMerge(state, action.payload, action.key)

        default:
            return state;
    }
}

export default commentsReducer;