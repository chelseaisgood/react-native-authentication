import authSaga from './AuthSaga';
import employeeSaga from './EmployeeSaga';

export default function* () {
  yield [
    authSaga(),
    employeeSaga(),
  ];
}
