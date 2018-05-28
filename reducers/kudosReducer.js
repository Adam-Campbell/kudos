import * as actionTypes from '../actionTypes';

const initialState = {};

const kudosReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                ...action.payload.kudos
            };

        default:
            return state;
    }
}

export default kudosReducer;