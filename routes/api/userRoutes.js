const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  addFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend);

module.exports = router;
