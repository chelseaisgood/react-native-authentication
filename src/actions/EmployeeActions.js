import {
    EMPLOYEE_CREATE,
    EMPLOYEE_LIST_FETCH, 
    START_FIREBASE_EMPLOYEE_UPDATE_LISTENER
} from './types';

export const employeeCreate = (name, phone, shift) => ({
    type: EMPLOYEE_CREATE,
    name,
    phone,
    shift,
});

export const employeeListFetch = () => ({
    type: EMPLOYEE_LIST_FETCH
});

export const startFirebaseEmployeeUpdateListener = () => ({
    type: START_FIREBASE_EMPLOYEE_UPDATE_LISTENER
});
