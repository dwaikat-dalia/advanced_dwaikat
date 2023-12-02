const express = require('express');
const router = express.Router();


const datacontroller = require('../controllers/dataController.js');


// GET all users
router.get('/data',datacontroller.GetData );

// CREATE a new user
router.post('/data',datacontroller.PostData );

// UPDATE an existing user
router.put('/data/:id', datacontroller.UpdateData);

// DELETE a user
router.delete('/data/:id', datacontroller.DeleteData);

module.exports = router;