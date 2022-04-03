import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState: {
    newsLoading: false,
    articles: {},
    filter: {},
  },
  reducers: {
    fetchNewsData: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload
      };
    },
    updateNewsData: (state, action) => {
      state.articles = action.payload?.articles;
    }
  },
});

export const {fetchNewsData, updateNewsData} = newsSlice.actions;

export default newsSlice.reducer;
