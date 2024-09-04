const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
} = require('../../controllers/userController.js');

router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend);

module.exports = router;
