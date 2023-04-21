const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateName, updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateName);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
