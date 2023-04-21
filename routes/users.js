const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateName, updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateName);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
