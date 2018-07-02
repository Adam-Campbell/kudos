import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const initialState = {};

const commentsReducer = (state=initialState, action) => {
    switch (action.type) {
        
        case actionTypes.STORE_COMMENT:
            return addOrMerge(state, action.payload.comment, action.payload.comment_id)

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