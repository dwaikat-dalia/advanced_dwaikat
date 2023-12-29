const express = require('express');
const router = express.Router();


const EnviromentAlertsController = require('../controllers/EnviromentAlertsController.js');

router.get('/Alerts',EnviromentAlertsController.GetAlerts );


router.post('/Alerts',EnviromentAlertsController.PostAlerts );

router.put('/Alerts/:id', EnviromentAlertsController.UpdateAlerts);

router.delete('/Alerts/:id', EnviromentAlertsController.DeleteAlerts);

router.get('/AlertsByLocation',EnviromentAlertsController.GetAlertsbyLocationAndInterest );
//router.get('/AlertsByLocation',EnviromentAlertsController.GetAlertsbyLocationAndInterestSpecific );


module.exports = router;