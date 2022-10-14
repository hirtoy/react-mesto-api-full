const Card = require('../models/card');
const BadRequestError = require('../error/bad-request-errors');
// eslint-disable-next-line import/no-unresolved
const ForbiddenError = require('../error/forbidden-errors');
const NotFoundError = require('../error/not-found-errors');

const {
  STATUS_CREATED, STATUS_OK,
} = require('../utils/constants');

// отображение карточек на странице
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(next);
};

// создание карточки
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        // eslint-disable-next-line new-cap
        next(new BadRequestError('Неверные данные'));
        return;
      }
      next(error);
    });
};

// удаление карточки
module.exports.delCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) { throw new NotFoundError('Карточка не найдена'); }
      if (!card.owner.equals(req.user._id)) { throw new ForbiddenError('Вы не можете удалить чужую карточку'); }
      return card.remove();
    })
    .then(() => {
      res.status(STATUS_OK).send({ message: `Карточка ${cardId} удалена` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданны некорректные данные'));
      } else next(err);
    });
};

// лайк карточки
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавляем _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      // eslint-disable-next-line new-cap
      throw new NotFoundError('Не верный запрос');
    }
    res.status(STATUS_CREATED).send(card);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      // eslint-disable-next-line new-cap
      next(new BadRequestError('Карточка не найдена'));
      return;
    }
    next(error);
  });

// убрать лайк
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убираем _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      // eslint-disable-next-line new-cap
      throw new NotFoundError('Не верный запрос');
    }
    res.status(STATUS_OK).send(card);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      // eslint-disable-next-line new-cap
      next(new BadRequestError('Карточка не найдена'));
      return;
    }
    next(error);
  });