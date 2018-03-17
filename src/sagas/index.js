import authSaga from './AuthSaga';

export default function* () {
  yield [
    authSaga(),
  ];
}
