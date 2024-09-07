const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,

} = require('../../controllers/userController.js');

router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').put(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);




module.exports = router;
