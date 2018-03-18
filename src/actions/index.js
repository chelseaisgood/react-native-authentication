import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    SIGNUP_USER,
    CHANGE_IF_LOGGING_IN_USER,
    CHANGE_IF_SIGNIN_GUP_USER,
    CLEAN_UP_LOGIN_ERROR_MESSAGE,
    CLEAN_UP_SIGNUP_ERROR_MESSAGE
} from './types';

export const emailChange = (text) => ({
    type: EMAIL_CHANGED,
    payload: text
});

export const passwordChange = password => ({
    type: PASSWORD_CHANGED,
    payload: password
});

export const loginUser = ({ email, password }) => ({
    type: LOGIN_USER,
    email,
    password
});

export const signupUser = ({ email, password }) => ({
    type: SIGNUP_USER,
    email,
    password
});

export const changeIfLoggingInUser = boolState => ({
    type: CHANGE_IF_LOGGING_IN_USER,
    boolState
});

export const changeIfSigningUpUser = boolState => ({
    type: CHANGE_IF_SIGNIN_GUP_USER,
    boolState
});

export const cleanUpLoginErrorMessage = () => ({
    type: CLEAN_UP_LOGIN_ERROR_MESSAGE
});

export const cleanUpSignupErrorMessage = () => ({
    type: CLEAN_UP_SIGNUP_ERROR_MESSAGE
});
