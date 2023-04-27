const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/mestodb');

// app.use((req, res, next) => {
//   req.user = {
//     _id: '643d4c8f9f852a8c096f18f0',
//   };
//   next();
// });

app.use('/', router);

app.listen(PORT);
