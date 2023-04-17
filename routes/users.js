const router = require('express').Router();
const User = require('../models/user');

// сработает при POST-запросе на URL /users
router.post('/', (req, res) => {
    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
        // вернём записанные в базу данные
        .then(user => res.send({ data: user }))
        // данные не записались, вернём ошибку
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/:userId', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/', (req, res) => {
    User.find({})
        .then(users => res.send({ data: users }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
})

module.exports = router;