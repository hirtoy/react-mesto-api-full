const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../error/bad-request-errors');
const EmailExistError = require('../error/email-exist-errors');
const NotFoundError = require('../error/not-found-errors');
const UnauthorizedError = require('../error/unauthorized-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  STATUS_OK,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById({ _id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Не верные данные пользователя' });
      } else res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError({ message: 'Не верные данные пользователя' }));
        return;
      }
      next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, about, avatar, email, password: hash,
      },
    ))
    .then((result) => {
      res.send({
        _id: result._id, name, about, avatar, email,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
        return;
      }
      if (error.code === 11000) {
        next(new EmailExistError(`Пользователь с почтой ${email} уже зарегистрирован`));
        return;
      }
      next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильная почта или пароль!'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильная почта или пароль!'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'MY_SUPER_SECRET',
            { expiresIn: '7d' },
          );

          res.status(STATUS_OK).send({ token });
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: `Пользователь ${userId} не найден` });
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Не верные данные пользователя' }));
        return;
      }
      if (error.name === 'CastError') {
        next(new BadRequestError({ message: 'Не верные данные пользователя' }));
        return;
      }
      next(error);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: `Пользователь ${userId} не найден` });
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        // eslint-disable-next-line new-cap
        next(new BadRequestError({ message: 'Неверные данные пользователя' }));
        return;
      }
      if (error.name === 'CastError') {
        // eslint-disable-next-line new-cap
        next(new BadRequestError({ message: 'Неверные данные пользователя' }));
        return;
      }
      next(error);
    });
};