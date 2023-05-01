const router = require('express').Router();
const {
  getUserId, getUsersMe, getUsers, updateName, updateAvatar,
} = require('../controllers/user');
const { errUpdateName, errUpdateAvatar } = require('../middlewares/error-celebrate');

router.get('/', getUsers);
router.get('/:userId', getUserId);
// router.post('/', createUser);
router.patch('/me', errUpdateName, updateName);
router.patch('/me/avatar', errUpdateAvatar, updateAvatar);
router.get('/me', getUsersMe);

module.exports = router;
