const router = require('express').Router();
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { errCreateCard } = require('../middlewares/error-celebrate');

router.get('/', getCard);
router.post('/', errCreateCard, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
