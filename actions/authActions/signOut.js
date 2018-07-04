import * as actionTypes from '../../actionTypes';

const signOutSuccess = () => ({
    type: actionTypes.SIGN_OUT_SUCCESS
});

export const signOut = () => async dispatch => {
    document.cookie = `token=;expires=${new Date(Date.now() - 3600000).toUTCString()}`;
    dispatch(signOutSuccess());
}