import { call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions/types';

function* loginUser({ email, password }) {
    try {
        // const result = yield call(firebaseLogin, email, password);
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
    } catch (e) {
        yield put({ type: LOGIN_USER_FAILURE });
        yield call(console.error, e);
    }
}

const firebaseLogin = (email, password) => {
    console.log('start');
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        console.log('end');
        console.log(user);
        console.log('end');
        return user;
    })
    .catch(error => console.error(error));
};


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export default authSaga;
