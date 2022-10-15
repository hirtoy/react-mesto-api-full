/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const {
  getUserById,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/me', getUserInfo);

userRoutes.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserById,
);

userRoutes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserProfile,
);

userRoutes.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(/^https?:\/\/(www.){0,1}([0-9a-zA-Z_-]+\.){1,3}[a-zA-Z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/m),
    }),
  }),
  updateUserAvatar,
);

module.exports = { userRoutes };
