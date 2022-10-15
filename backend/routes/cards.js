const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

Joi.objectId = require('joi-objectid')(Joi);

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\/(www.){0,1}([0-9a-zA-Z_-]+\.){1,3}[a-zA-Z]+[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/m)
      .required(),
  }).unknown(true),
}), createCard);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
}), dislikeCard);

module.exports = router;
