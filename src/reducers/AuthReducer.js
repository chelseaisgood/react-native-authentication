import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    CHANGE_IF_LOGGING_IN_USER,
    CHANGE_IF_SIGNING_UP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    CLEAN_UP_LOGIN_ERROR_MESSAGE,
    CLEAN_UP_SIGNUP_ERROR_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    loginError: '',
    loginProcessing: false,
    signupError: '',
    signupProcessing: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case CHANGE_IF_LOGGING_IN_USER:
            return { ...state, loginProcessing: action.boolState };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, password: '' };
        case LOGIN_USER_FAILURE:
            return { ...state, loginError: action.loginError };
        case CLEAN_UP_LOGIN_ERROR_MESSAGE:
            return { ...state, loginError: '' };

        case CHANGE_IF_SIGNING_UP_USER:
            return { ...state, signupProcessing: action.boolState };
        case SIGNUP_USER_SUCCESS:
            return { ...state, user: action.payload, password: '' };
        case SIGNUP_USER_FAILURE:
            return { ...state, signupError: action.signupError };
        case CLEAN_UP_SIGNUP_ERROR_MESSAGE:
            return { ...state, signupError: '' };

        default:
            return state;
    }
};
