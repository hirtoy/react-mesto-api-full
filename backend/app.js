require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('./middelewares/cors');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
// const NotFoundError = require('./error/not-found-errors');
const { requestLogger, errorLogger } = require('./middelewares/Logger');
const errorHandler = require('./middelewares/error-handler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);

// app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(routerUser);
app.use(routerCards);

app.use((err, req, res) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

app.use(errors());
app.use(errorLogger);

app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`Сервер запущен на порту ${PORT}`); });