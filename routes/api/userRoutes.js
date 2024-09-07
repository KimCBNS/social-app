const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  createThought,

} = require('../../controllers/userController.js');

router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').put(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);


//routes to add thoughts (thoughts are unique and have their own ids and data fields)
router.route('/:userId/thoughts').put(createThought); // Get all thoughts
//router.route('/:userId/thoughts').post(addThought).get(getUserThoughts); 


module.exports = router;
