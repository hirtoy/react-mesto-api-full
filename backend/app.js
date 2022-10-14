require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUsers } = require('./controllers/users');
const NotFoundError = require('./error/not-found-errors');
const { requestLogger, errorLogger } = require('./middelewares/Logger');
const errorHandler = require('./middelewares/error-handler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: ['https://api.hirtoy.nomoreparties.icu', 'http://hirtoy.nomoreparties.icu'],
  credentials: true,
}));

app.use(cookieParser());

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

app.use('/', routerUser);
app.use('/', routerCards);

app.post('/signin', login);
app.post('/signup', createUsers);

app.use(errors());
app.use(errorLogger);

app.use(errorHandler);

app.all('/*', () => {
  throw new NotFoundError('К сожалению, запращиваемый ресурс не найден');
});

app.listen(PORT);