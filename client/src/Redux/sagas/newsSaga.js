import {takeLatest, all, put, call} from 'redux-saga/effects';
import {fetchNewsData, updateNewsData} from '../reducers/newsSlice';
import newsService from '../../Utils/Services/newsService';

export function* fetchData(data) {
  try {
    const newsData = yield call(
      newsService.getNews,
      data.payload
    );
    if(newsData.data.status === 'SUCCESS'){
      yield put({
        payload: JSON.parse(newsData.data.newsData),
        type: updateNewsData.type,
      });
    }else{
      yield put({payload: newsData.data, type: updateNewsData.type});
    }
  } catch (err) {
    console.log('Failed to get the news data');
    console.log(err.message);
  }
}

export function* watcheronFetchNewsData() {
  yield all([takeLatest(fetchNewsData, fetchData)]);
}
