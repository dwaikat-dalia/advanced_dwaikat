const express = require('express');
const router = express.Router();


// Import your database connection module
//const db = require('../database.js');
const OtherControllers = require('../controllers/OtherControllers.js');
const signup = require('../controllers/signup.js');
const login = require('../controllers/Login.js');

// GET all users
router.get('/Routes',OtherControllers.GetResources );

// CREATE a new user
router.post('/Routes',OtherControllers.PostResources );

// UPDATE an existing user
router.put('/Routes/:id', OtherControllers.UpdateResources);

// DELETE a user
router.delete('/Routes/:id', OtherControllers.DeleteResources);

router.post('/signup',signup.SignUser);


////////////////Community////////////////

// GET all reports
router.get('/report',OtherControllers.GetReport );

// CREATE a new report
router.post('/report',OtherControllers.PostReport );

// UPDATE an existing user
router.put('/report/:id', OtherControllers.UpdateReport);

// DELETE a user
router.delete('/report/:id', OtherControllers.DeleteReport);


//////////////////////Data////////////////////////////////////////
router.get('/data',OtherControllers.GetData );

// CREATE a new Data
router.post('/data',OtherControllers.PostData );

// UPDATE an existing Data
router.put('/data/:id', OtherControllers.UpdateData);

// DELETE  Data
router.delete('/data/:id', OtherControllers.DeleteData);

//////////////////////////Sustanability Score////////////////////
// GET all users
router.get('/usersSus',OtherControllers.GetUserSus );

// CREATE a new user
router.post('/usersSus',OtherControllers.PostUserSus );

// UPDATE an existing user
router.put('/usersSus/:id', OtherControllers.UpdateUserSus);

// DELETE a user
router.delete('/usersSus/:id', OtherControllers.DeleteUserSus);

////////////login//////////////////////////////
router.get('/login',login.getLogin);

module.exports = router;