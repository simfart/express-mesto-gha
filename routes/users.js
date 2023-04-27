const router = require('express').Router();
const {
  getUser, getUsers, updateName, updateAvatar,
} = require('../controllers/user');
// const auth = require('../middlewares/auth');

router.get('/', getUsers);
router.get('/:userId', getUser);
// router.post('/', createUser);
router.patch('/me', updateName);
router.patch('/me/avatar', updateAvatar);
router.get('/me', getUser);

// router.post('/signin', login);
// router.post('/signup', createUser);

module.exports = router;
