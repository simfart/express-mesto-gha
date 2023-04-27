const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const errorNotFound = require('../utils/errorNotFound');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', errorNotFound);

module.exports = router;
