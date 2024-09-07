const router = require('express').Router();
const {
  getThoughts,
  createThought,
  deleteThought,

} = require('../../controllers/userController.js');


//routes to add thoughts (thoughts are unique and have their own ids and data fields)
router.route('/').get(getThoughts); 
router.route('/:userId').put(createThought); 

router.route('/:userId/delete/:thoughtId').put(deleteThought); // delete a thought from the user

module.exports = router;
