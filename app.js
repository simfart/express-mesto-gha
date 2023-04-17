const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb')

app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
    req.user = {
        _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});

module.exports.createCard = (req, res) => {
    console.log(req.user._id); // _id станет доступен
};

app.listen(PORT, () => {
    console.log('Ссылка на сервер');
});
