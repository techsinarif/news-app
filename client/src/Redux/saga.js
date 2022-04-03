import {all, fork} from 'redux-saga/effects';
import {
  watcheronFetchNewsData,
} from './sagas/newsSaga';

export default function* saga() {
  yield all([
    fork(watcheronFetchNewsData)
  ]);
}
