const express = require('express');
const router = express.Router();
//const weatherController = require('./weatherController');

const app = express();

// Import your database connection module
//const db = require('../database.js');
const OtherControllers = require('../controllers/OtherControllers.js');
const signup = require('../controllers/signup.js');
const login = require('../controllers/Login.js');

const profile = require('../controllers/profile.js');
//const weather = require('../controllers/OtherControllers.js');

///////////////////////////external APi//////////

/*router.get('/getAirQuality/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const airQuality = weather.getAirQualityData(city);
    res.json({ status: 'success', airQuality });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch air quality data.' });
  }
});*/
router.get('/getAirQuality/:city',OtherControllers.getAirQualityData );
//getDataFromCustomApi
router.get('/getDataFromCustomApi/:city',OtherControllers.getDataFromCustomApi );

////////////////////////Educational Resources///////////////////////////
router.get('/Routes',OtherControllers.GetResources );

router.post('/Routes',OtherControllers.PostResources );

router.put('/Routes/:id', OtherControllers.UpdateResources);

router.delete('/Routes/:id', OtherControllers.DeleteResources);

router.post('/signup',signup.SignUser);


////////////////Community////////////////////////////////////

// GET all reports
router.get('/report',OtherControllers.GetReport );

// CREATE a new report
router.post('/report',OtherControllers.PostReport );

// UPDATE an existing user
router.put('/report/:id', OtherControllers.UpdateReport);

// DELETE a user
router.delete('/report/:id', OtherControllers.DeleteReport);

router.get('/report/:id',OtherControllers.GetReportByID );

router.get('/reportByUser',OtherControllers.GetReportByUserID );

router.delete('/reportdeletebyUser', OtherControllers.DeleteReportbyuserid);



//////////////////////open Data Access////////////////////////////////////////
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

////////////GetFriendsSameInterest//////////////////////////////
router.get('/friends',OtherControllers.GetFriends);

////////////////////enviromental data////////////////////
router.get('/env',OtherControllers.GetEnviromental );

router.get('/envUser',OtherControllers.GetEnviromentalByUser);

router.post('/env',OtherControllers.PostEnviromental );

router.put('/envupdate/:DataID', OtherControllers.UpdateEnviromental);

router.delete('/envdelete/:DataID', OtherControllers.DeleteEnviromental);

////////////////user profile///////////////////////////
router.get('/prof',profile.GetUserprofile);

router.get('/profileId/:id',profile.GetUserprofileByProfileID);

router.post('/prof',profile.Postprofile );

router.put('/prof/:id', profile.UpdateProfile);

router.delete('/prof/:id', profile.Deleteprofile); 

router.delete('/profileUser/:id', profile.DeleteprofileByUser);

 //Example endpoint to get weather information from an external API
 
 
   router.get('/api/weather/:city', async(req, res)  => {
    const city = req.params.city;
    const apiKey = 'fc78157dbfb9a2dce1aaf70d03a9b4eb'; // Replace with your actual API key
  
    try {
      // Replace 'api.openweathermap.org' with the correct API endpoint
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  
      // Extract relevant data from the OpenWeatherMap API response
      const { main, weather } = response.data;
      const temperature = main.temp;
      const conditions = weather[0].description;
      const humidity = main.humidity;
  
      // Return the data to the client
      res.status(200).json({
        temperature,
        conditions,
        humidity,
      });
    } catch (error) {
      console.error('Error fetching weather data from OpenWeatherMap API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;


