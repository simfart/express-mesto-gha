const router = require('express').Router();
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { errCreateCard, errCardId } = require('../middlewares/error-celebrate');

router.get('/', getCard);
router.post('/', errCreateCard, createCard);
router.delete('/:cardId', errCardId, deleteCard);
router.put('/:cardId/likes', errCardId, likeCard);
router.delete('/:cardId/likes', errCardId, dislikeCard);

module.exports = router;
