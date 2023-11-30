const express = require('express');
const router = express.Router();


// Import your database connection module
//const db = require('../database.js');
const Reportcontroller = require('../controllers/communityReportC.js');

// GET all users
router.get('/report',Reportcontroller.GetReport );

// CREATE a new user
router.post('/report',Reportcontroller.PostReport );

// UPDATE an existing user
router.put('/report/:id', Reportcontroller.UpdateReport);

// DELETE a user
router.delete('/report/:id', Reportcontroller.DeleteReport);

module.exports = router;