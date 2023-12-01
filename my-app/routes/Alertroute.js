const express = require('express');
const router = express.Router();


// Import your database connection module
//const db = require('../database.js');
const EnviromentAlertsController = require('../controllers/EnviromentAlertsController.js');

// GET all users
router.get('/Alerts',EnviromentAlertsController.GetAlerts );

// CREATE a new user
router.post('/Alerts',EnviromentAlertsController.PostAlerts );

// UPDATE an existing user
router.put('/Alerts/:id', EnviromentAlertsController.UpdateAlerts);

// DELETE a user
router.delete('/Alerts/:id', EnviromentAlertsController.DeleteAlerts);

module.exports = router;