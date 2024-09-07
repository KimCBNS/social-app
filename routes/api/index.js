const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// use /users for user related routes
router.use('/users', userRoutes);

// Use /thoughts for thought-related routes
router.use('/thoughts', thoughtRoutes);


module.exports = router;

