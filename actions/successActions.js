import * as actionTypes from '../actionTypes';

export const passwordResetEmailSentRegister = () => ({
    type: actionTypes.PASSWORD_RESET_EMAIL_SENT_REGISTER
});

export const passwordResetEmailSentAcknowledge = () => ({
    type: actionTypes.PASSWORD_RESET_EMAIL_SENT_ACKNOWLEDGE
});

export const cleanseSuccesses = () => ({
    type: actionTypes.CLEANSE_SUCCESSES
});
