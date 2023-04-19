const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb')

app.use((req, res, next) => {
    req.user = {
        _id: '643d35b19f852a8c096f18ed',
    };

    next();
});


app.use(usersRoutes);
app.use(cardsRoutes);



app.listen(PORT, () => {
    console.log('Ссылка на сервер: ', PORT);
});
