import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    CHANGE_IF_LOGGING_IN_USER,
    CHANGE_IF_SIGNING_UP_USER
} from '../actions/types';


function* loginUser({ email, password }) {
    yield put({ type: CHANGE_IF_LOGGING_IN_USER, boolState: true });
    try {
        console.log(email);
        console.log(password);
        const auth = firebase.auth();
        yield call(console.log, auth);
        yield call(console.log, auth.signInWithEmailAndPassword);
        const result = yield call(
            [auth, auth.signInWithEmailAndPassword],
            email,
            password
        );
        yield call(console.log, result);
        yield put({ type: LOGIN_USER_SUCCESS, payload: result });
        yield call(Actions.main);
    } catch (e) {
        let errorMessage = 'Server Error. Please try again later!';
        if (e.message) {
            errorMessage = e.message;
        }
        yield put({ type: LOGIN_USER_FAILURE, loginError: errorMessage });
    }
    yield put({ type: CHANGE_IF_LOGGING_IN_USER, boolState: false });
}

function* signupUser({ email, password }) {
    yield put({ type: CHANGE_IF_SIGNING_UP_USER, boolState: true });
    try {
        console.log(email);
        console.log(password);
        const auth = firebase.auth();
        yield call(console.log, auth);
        yield call(console.log, auth.createUserWithEmailAndPassword);
        const result = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            email,
            password
        );
        yield call(console.log, result);
        yield put({ type: SIGNUP_USER_SUCCESS, payload: result });
    } catch (e) {
        let errorMessage = 'Server Error. Please try again later!';
        if (e.message) {
            errorMessage = e.message;
        }
        yield put({ type: SIGNUP_USER_FAILURE, signupError: errorMessage });
    }
    yield put({ type: CHANGE_IF_SIGNING_UP_USER, boolState: false });
}

// const firebaseLogin = (email, password) => {
//     console.log('start');
//     console.log(email);
//     console.log(password);

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(user => {
//         console.log('end');
//         console.log(user);
//         console.log('end');
//         return user;
//     })
//     .catch(error => console.error(error));
// };


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(SIGNUP_USER, signupUser);
}

export default authSaga;
