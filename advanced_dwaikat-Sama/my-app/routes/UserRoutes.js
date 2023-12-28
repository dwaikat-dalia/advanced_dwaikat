const express = require('express');
const router = express.Router();


// Import your database connection module
//const db = require('../database.js');
const usercontroller = require('../controllers/UserControllers.js');

// GET all users
router.get('/users',usercontroller.GetUser );

// CREATE a new user
router.post('/users',usercontroller.PostUser );

// UPDATE an existing user
router.put('/users/:id', usercontroller.UpdateUser);

// DELETE a user
router.delete('/users/:id', usercontroller.DeleteUser);

module.exports = router;