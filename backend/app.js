const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middelewares/cors');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middelewares/auth');
const NotFoundError = require('./error/not-found-err');
const { requestLogger, errorLogger } = require('./middelewares/Logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => { console.log(`Сервер запущен на порту ${PORT}`); });