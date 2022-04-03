const router = require('express').Router();
const axios = require('axios');

const circularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof(value) === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
   };
};

router.get('/all', async (req, res) => {
  const url = 'https://newsapi.org/v2/everything';
  const defFilter = {
    apiKey: process.env.NEWS_API_KEY, //TODO: have to keep the api key in environment variable
    q: 'Apple'
  }
  axios
    .get(url,{
      params: {
        ...defFilter,
        ...req.query
      }
    })
    .then((resp) => {
      let jsonString = JSON.stringify(resp.data, circularReplacer());
      return res.status(200).json({status: 'SUCCESS', newsData: jsonString});
    })
    .catch((err) => {
      return res.status(400).json({status: 'FAILURE', error: err});
    })
});

module.exports = router;