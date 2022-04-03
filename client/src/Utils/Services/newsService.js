import axios from 'axios';

function newsApiService() {
  const getNews = async (filter) => {
    const url = '/api/news/all';
    return axios
      .get(url, {
        params: filter,
      })
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return err;
        }
      );
  };

  return {getNews};
}

const newsService = newsApiService();

export default newsService;
