// import firebase from 'firebase';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER } from './types';

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
    // console.log('email: ' + email);
    // console.log('password: ' + password);
    // return (dispatch) => {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(user => {
    //             dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    //         })
    //         .catch(error => console.error(error));
    // };
});
