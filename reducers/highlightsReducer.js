import * as actionTypes from '../actionTypes';

const initialState = {};

const highlightsReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                ...action.payload.highlights
            };

        case actionTypes.FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                ...action.payload.highlights
            };

        default:
            return state;
    }
}

export default highlightsReducer;