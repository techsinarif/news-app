import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    immutableCheck: false,
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: reducer,
  middleware,
});

sagaMiddleware.run(saga);

export default store;
