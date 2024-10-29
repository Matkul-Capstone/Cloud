const express = require('express');
const app = express();
const userRoute = require('../routers/userRouter');
const logRoute = require('../routers/logRouter');
const sentenceRoute = require('../routers/sentenceRouter')
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(('/users'), userRoute);
app.use(('/log'), logRoute);
app.use(('/sentences'), sentenceRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});