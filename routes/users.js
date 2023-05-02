const router = require('express').Router();
const {
  getUserId, getUsers, updateName, updateAvatar, getUsersMe,
} = require('../controllers/user');
const { errUserdId, errUpdateName, errUpdateAvatar } = require('../middlewares/error-celebrate');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', errUserdId, getUserId);
router.patch('/me', errUpdateName, updateName);
router.patch('/me/avatar', errUpdateAvatar, updateAvatar);

module.exports = router;
