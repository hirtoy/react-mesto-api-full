const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getUsers, getUserById, getAboutUser, updateUser, updateAvatar, login, createUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getAboutUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(/^https?:\/\/(www.){0,1}([0-9a-zA-Z_-]+\.){1,3}[a-zA-Z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/m),
  }),
}), updateAvatar);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(/^https?:\/\/(www.){0,1}([0-9a-zA-Z_-]+\.){1,3}[a-zA-Z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/m),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
}), createUser);

module.exports = router;
