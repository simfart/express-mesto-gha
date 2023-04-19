const Card = require('../models/card');

const getCard = (req, res) => {
    Card.find({})
        .populate(['owner', 'likes'])
        .then(cards => res.send({ data: cards }))
        .catch(err => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
    const { name, link } = req.body;
    const owner = req.user._id;

    Card.create({ name, link, owner })
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: err.message }));

};

const deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: err.message }));

};

// const likeCard = (req, res) => {
//     Card.findByIdAndUpdate(
//         req.params.cardId,
//         { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//         { new: true },
//     )
// }

const likeCard = (req, res) => {
    Card
        .findByIdAndUpdate(
            req.params.cardId,
            { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        )
        .orFail(new Error('Not found'))
        .then((card) => card.populate(['owner', 'likes']))
        .then((card) => {
            res.send({ data: card });
        })
        .catch((err) => setErrorMessage(err, res));
};


const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
        res.send({ data: card });
    })
}

module.exports = {
    getCard,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}


