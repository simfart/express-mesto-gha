const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const errorNotFound = require('../utils/errorNotFound');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', errorNotFound);

module.exports = router;
