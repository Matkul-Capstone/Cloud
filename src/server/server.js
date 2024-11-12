const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('../middleware/errorHandler');
const userRoute = require('../routers/userRouter');
const logRoute = require('../routers/logRouter');
const sentenceRoute = require('../routers/sentenceRouter')
const transcribeRoute = require('../routers/transcribeRouter');

require('dotenv').config();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(('/users'), userRoute);
app.use(('/log'), logRoute);
app.use(('/sentences'), sentenceRoute);
app.use(('/transcribe'), transcribeRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});