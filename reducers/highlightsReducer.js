import * as actionTypes from '../actionTypes';

const initialState = {};

const highlightsReducer = (state=initialState, action) => {
    switch (action.type) {

        case actionTypes.STORE_HIGHLIGHTS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export default highlightsReducer;