import {combineReducers} from 'redux';
import newsSlice from './reducers/newsSlice';

const reducer = combineReducers({
  newsData: newsSlice,
});

export default reducer;
