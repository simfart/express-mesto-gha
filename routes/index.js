const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const errorNotFound = require('../utils/errorNotFound');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const {
  errCreateUser, errLogin, errGetUser, errUpdateName, errUpdateAvatar, errCreateCard, errCardId,
} = require('../middlewares/error-celebrate');

router.post('/signin', errLogin, login);
router.post('/signup', errCreateUser, createUser);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', errorNotFound);

module.exports = router;
