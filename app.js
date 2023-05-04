const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
const router = require('./routes/index');
// const errorsMiddleWare = require('./middlewares/errors');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use('/', router);
// app.use(errors());

app.use(errorHandler);

app.listen(PORT);
