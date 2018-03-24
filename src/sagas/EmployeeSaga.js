import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_CREATE,
    EMPLOYEE_LIST_FETCH_SUCCESS,
    START_FIREBASE_EMPLOYEE_UPDATE_LISTENER,
    EMPLOYEE_UPDATE,
    EMPLOYEE_DELETE
} from '../actions/types';


function* createEmployee({ name, phone, shift }) {
    yield call(console.log, name, phone, shift);
    const { currentUser } = firebase.auth();

    // /users/userId/employees path to json data store
    // firebase.database().ref(`/users/${currentUser.uid}/employees`)
    // .push({ name, phone, shift });
    const path = `/users/${currentUser.uid}/employees`;
    const func = firebase.database().ref(path);
    const data = { name, phone, shift };
    console.log(path);
    console.log(func);
    console.log(data);
    try {
        yield call(
            [func, func.push],
            data
        );
        yield call(Actions.pop, { type: 'reset' });
    } catch (e) {
        console.log(e);
        console.log('fail to create employee');
    }
}

function* updateEmployee({ name, phone, shift, uid }) {
    yield call(console.log, name, phone, shift, uid);
    const { currentUser } = firebase.auth();

    // /users/userId/employees path to json data store
    // firebase.database().ref(`/users/${currentUser.uid}/employees`)
    // .push({ name, phone, shift });
    const path = `/users/${currentUser.uid}/employees/${uid}`;
    const func = firebase.database().ref(path);
    const data = { name, phone, shift, uid };
    console.log(path);
    console.log(func);
    console.log(data);
    try {
        yield call(
            [func, func.set],
            data
        );
        yield call(Actions.pop, { type: 'reset' });
    } catch (e) {
        console.log(e);
        console.log('fail to update employee');
    }
}

function* fireEmployee({ uid }) {
    yield call(console.log, uid);
    const { currentUser } = firebase.auth();
    
    const path = `/users/${currentUser.uid}/employees/${uid}`;
    const func = firebase.database().ref(path);
    console.log(path);
    console.log(func);
    try {
        yield call(
            [func, func.remove]
        );
        yield call(Actions.main, { type: 'reset' });
    } catch (e) {
        console.log(e);
        console.log('fail to delete employee');
    }
}

function createChannel() {
    const { currentUser } = firebase.auth();
    const path = `/users/${currentUser.uid}/employees`;
	const ref = firebase.database().ref(path);

	const channel = eventChannel(emit => {
		ref.on('value', snapshot => {
			emit(snapshot.val());
		});
		return () => ref.off();
	});

	return channel;
}

function* createFetchEmployeeListChannel() {
	const channel = createChannel();

	while (true) {
		const payload = yield take(channel);
		yield put({ type: EMPLOYEE_LIST_FETCH_SUCCESS, payload });
	}
}

function* fetchEmployeeList() {
    yield fork(createFetchEmployeeListChannel);
}

function* employeeSaga() {
  yield takeEvery(EMPLOYEE_CREATE, createEmployee);
  yield takeEvery(START_FIREBASE_EMPLOYEE_UPDATE_LISTENER, fetchEmployeeList);
  yield takeEvery(EMPLOYEE_UPDATE, updateEmployee);
  yield takeEvery(EMPLOYEE_DELETE, fireEmployee);
}

export default employeeSaga;
