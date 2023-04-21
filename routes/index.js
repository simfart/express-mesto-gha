const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const errorNotFound = require('../utils/errorNotFound');

const errorNotFoundRout = router.use('*', errorNotFound);

module.exports = { usersRoutes, cardsRoutes, errorNotFoundRout };
