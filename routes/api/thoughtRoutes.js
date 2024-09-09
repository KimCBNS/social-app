const router = require('express').Router();
const {
  getThoughts,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction

} = require('../../controllers/userController.js');


//routes to add thoughts (thoughts are unique and have their own ids and data fields)
router.route('/').get(getThoughts); 
router.route('/:userId').put(createThought); 

router.route('/:userId/delete/:thoughtId').put(deleteThought); // delete a thought from the user

router.route('/:thoughtId/reactions').post(createReaction); // create a reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction); // create a reaction
module.exports = router;
