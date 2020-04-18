const { APP_PORT, APP_HOST, ALLOWED_ORIGIN } = process.env;
const allowedOrigin = ALLOWED_ORIGIN;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const { errorHandler } = require('./helper');

const routes = require('./routes');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();
const corsConfig = cors({
  origin: allowedOrigin
});

app.use(morgan('combined'));
app.use(urlencodedParser);
app.use(jsonParser);
app.use(corsConfig);

app.use('/', routes);

app.use(errorHandler);

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Listening on ${APP_HOST}:${APP_PORT}...`);
});
