/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
const Card = require('../models/card');

const { STATUS_CREATED } = require('../utils/constants');

const BadRequestError = require('../errors/bad-request-errors');
const ForbiddenError = require('../errors/forbidden-errors');
const NotFoundError = require('../errors/not-found-errors');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = Card.create({ name, link, owner: req.user._id });
    res.status(STATUS_CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const deleteCard = (req, res, next) => {
  try {
    const card = Card.findById({ _id: req.params.cardId });
    if (!card) {
      next(new NotFoundError('Карточка с указанным id не найдена'));
      return;
    }
    if (card.owner.toString() !== req.user._id) {
      next(new ForbiddenError('Можно удалять только свои карточки'));
      return;
    }
    const delCard = Card.findByIdAndRemove({ _id: req.params.cardId });
    res.send({ message: 'Карточка успешно удалена', delCard });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const likeCard = (req, res, next) => {
  try {
    const card = Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий id карточки'));
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

const dislikeCard = (req, res, next) => {
  try {
    const card = Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий id карточки'));
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
