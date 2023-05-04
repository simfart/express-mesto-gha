const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const notFound = require('../controllers/notFound');
const { createUser, login, logout } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { errCreateUser, errLogin } = require('../middlewares/error-celebrate');

router.post('/signin', errLogin, login);
router.post('/signup', errCreateUser, createUser);
router.get('/signout', logout);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', auth, notFound);

module.exports = router;
