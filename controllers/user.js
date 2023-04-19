const User = require('../models/user');

const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    console.log(req.body)

    User.create({ name, about, avatar })
        // вернём записанные в базу данные
        .then(user => res.status(201).send({ data: user }))
        // данные не записались, вернём ошибку
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const getUsers = (req, res) => {
    User.find({})
        .then(users => res.send({ data: users }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const updateName = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
    })
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}



const updateAvatar = (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
    })
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {
    createUser,
    getUser,
    getUsers,
    updateName,
    updateAvatar
}

