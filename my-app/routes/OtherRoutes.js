const express = require('express');
const router = express.Router();


// Import your database connection module
//const db = require('../database.js');
const OtherControllers = require('../controllers/OtherControllers.js');
const signup = require('../controllers/signup.js');

// GET all users
router.get('/Routes',OtherControllers.GetResources );

// CREATE a new user
router.post('/Routes',OtherControllers.PostResources );

// UPDATE an existing user
router.put('/Routes/:id', OtherControllers.UpdateResources);

// DELETE a user
router.delete('/Routes/:id', OtherControllers.DeleteResources);

router.post('/signup',signup.SignUser);
module.exports = router;