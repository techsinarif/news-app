const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({path: './config/config.env'});

app.use(express.json());

app.use('/api/news', require('./routes/news'));

const port = 8080;

app.listen(port, () => {
  console.log('Node application started in port:', port);
})