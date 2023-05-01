const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsMiddleWare = require('./middlewares/error copy');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/mestodb');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '643d4c8f9f852a8c096f18f0',
//   };
//   next();
// });

app.use('/', router);
app.use(errors());

app.use(errorsMiddleWare);

app.listen(PORT);
