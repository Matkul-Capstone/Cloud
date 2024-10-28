const express = require('express');
const app = express();
const port = process.env.PORT;
const userRouter = require('../routers/userRouter');
const sentenceRouter = require('../routers/sentenceRouter')
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());
app.use(('/users'), userRouter);
app.use(('/sentences'), sentenceRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});