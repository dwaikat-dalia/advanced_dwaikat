const express = require('express');
/*const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;*/
const db = require('../database.js');

//////////////////////////////
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, World!\n');
});

//const userAuth = require('../controllers/Login.js'); 
////////////////////////////////


///////////////////////Educational Resources Table////////////////////////////
exports.GetResources = (req, res) => {
   db.query('SELECT * FROM educationalresources', (err, results) => {
        if (err) {
          console.error('Error fetching Resources:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
};
exports.PostResources = (req, res) => {
    const {Resource_ID, Title,Content,Author,Tags } = req.body;
    const Timestamp = new Date();

    db.query('INSERT INTO educationalresources (Resource_ID, Title , Content,Timestamp,Author,Tags) VALUES (?,?, ?, ?,?,?)', [Resource_ID, Title,Content,Timestamp,Author,Tags], (err, result) => {
      if (err) {
        console.error('Error creating Resources:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Resource added successfully', Resource_ID: result.insertId });
      }
    });
};
exports.UpdateResources = (req, res) => {
    const Resourceid = req.params.id;
    const {Resource_ID, Title,Content,Author,Tags } = req.body;
    const Timestamp = new Date();

    db.query('UPDATE educationalresources SET Title=?, Content=?, Timestamp=? , Author=? , Tags=? WHERE Resource_ID=?', [Title,Content,Timestamp,Author,Tags, Resourceid], (err, result) => {
      if (err) {
        console.error('Error updating Resource:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Resource updated successfully', rowsAffected: result.affectedRows });
      }
    });
};
exports.DeleteResources = (req, res) => {
    const Resourceid = req.params.id;

    db.query('DELETE FROM educationalresources WHERE Resource_ID=?', [Resourceid], (err, result) => {
      if (err) {
        console.error('Error deleting Alert:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Resource deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};

/////////////////////////////////Community Report////////////////////////////////////////////
exports.GetReport = (req, res) => { 
  const myGlobalInteger = require('./Login');
  db.query('SELECT * FROM CommunityReports', (err, results) => {
       if (err) {
         console.error('Error fetching CommunityReports:', err);
         res.status(500).json({ error: 'Internal Server Error' });
       } else {
       // console.log(myGlobalInteger);
       // res.json(myGlobalInteger);
         res.json(results);
       }
     });
    
};
exports.PostReport = (req, res) => {
  const userID = require('./Login');
  console.log(req.body); 
  const {User_ID , Report_Message, Environmental_Issue_Type, Location } = req.body;
  //const userid= userAuth.getLoggedInUserId();

  const Timestamp = new Date(); // Create a new Date object to get the current timestamp

  // Remove Report_ID from here since it's an AUTO_INCREMENT field in the table
  db.query('INSERT INTO communityreports (User_ID, Timestamp, Report_Message, Environmental_Issue_Type, Location) VALUES (?,?,?,?,?)', [userID, Timestamp, Report_Message, Environmental_Issue_Type, Location], (err, result) => {
      if (err) {
          console.error('Error creating CommunityReports:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json({ message: 'Report created successfully', ReportId: result.insertId });
      }
  });
};

exports.UpdateReport = (req, res) => {
  const userID = require('./Login');
  const ReportId = req.params.id;
  const { User_ID, Report_Message, Environmental_Issue_Type, Location } = req.body;
  const Timestamp = new Date();

  db.query('UPDATE communityreports SET  User_ID=?, Timestamp=?, Report_Message=? ,Environmental_Issue_Type=? ,Location=?  WHERE Report_ID=?', [ userID, Timestamp, Report_Message ,  Environmental_Issue_Type , Location,ReportId], (err, result) => {
    if (err) {
      console.error('Error updating Reports:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Report updated successfully', rowsAffected: result.affectedRows });
    }
  });
};
exports.DeleteReport = (req, res) => {
  const ReportId = req.params.id;

  db.query('DELETE FROM communityreports WHERE Report_ID=?', [ReportId], (err, result) => {
    if (err) {
      console.error('Error deleting Report:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Report deleted successfully', rowsAffected: result.affectedRows });
    }
  });
};

exports.DeleteReportbyuserid = (req, res) => {
  const userid = require('./Login');
  db.query('DELETE FROM communityreports WHERE User_ID=?', [userid], (err, result) => {
    if (err) {
      console.error('Error deleting Report:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Report deleted successfully', rowsAffected: result.affectedRows });
    }
  });
};

exports.GetReportByID = (req, res) => {
  const ReportId = req.params.id;
  const { User_ID, Report_Message, Environmental_Issue_Type, Location } = req.body;
  const Timestamp = new Date();
  
  db.query('SELECT *FROM CommunityReports WHERE Report_ID=?',[ReportId], (err, results) => {
    if (err) {
      console.error('Error fetching CommunityReports:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
    // console.log(myGlobalInteger);
    // res.json(myGlobalInteger);
      res.json(results);
    }
  });
};

exports.GetReportByUserID = (req, res) => {
  const userid = require('./Login');
 // const userid1 = req.params.id;

  const { User_ID, Report_Message, Environmental_Issue_Type, Location } = req.body;
  const Timestamp = new Date();
  
  db.query('SELECT *FROM CommunityReports WHERE User_ID=?',[userid], (err, results) => {
    if (err) {
      console.error('Error fetching CommunityReports:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
    // console.log(myGlobalInteger);
    // res.json(myGlobalInteger);
      res.json(results);
      //res.json(userid);

    }
  });
};


/////////////////////////////////Data Resources/////////////////////////////
exports.GetData = (req, res) => { 
  db.query('SELECT * FROM opendataaccess', (err, results) => {
       if (err) {
         console.error('Error fetching opendataaccess:', err);
         res.status(500).json({ error: 'Internal Server Error' });
       } else {
         res.json(results);
       }
     });
};
exports.PostData = (req, res) => {
   console.log(req.body); 
   const { Access_ID, Researcher_ID, Data_Request_Details, status } = req.body;
   const Timestamp = new Date();
   // Remove Report_ID from here since it's an AUTO_INCREMENT field in the table
   db.query('INSERT INTO opendataaccess (Access_ID, Researcher_ID, Timestamp, Data_Request_Details, status) VALUES (?,?,?,?,?)', [Access_ID, Researcher_ID, Timestamp, Data_Request_Details, status], (err, result) => {
       if (err) {
           console.error('Error creating opendataaccess:', err);
           res.status(500).json({ error: 'Internal Server Error' });
       } else {
           res.json({ message: 'Data created successfully', dataId: result.insertId });
       }
   });
};


exports.UpdateData = (req, res) => {
 
   const dataId = req.params.id;
   const { Access_ID, Researcher_ID,  Data_Request_Details, status } = req.body;  
   const Timestamp = new Date();

   db.query('UPDATE opendataaccess SET   Researcher_ID=?, Timestamp=?, Data_Request_Details=? ,status=?  WHERE Access_ID=?', [Researcher_ID,User_ID, Timestamp, Data_Request_Details ,  status], (err, result) => {
     if (err) {
       console.error('Error updating Data:', err);
       res.status(500).json({ error: 'Internal Server Error' });
     } else {
       res.json({ message: 'Data updated successfully', rowsAffected: result.affectedRows });
     }
   });
};
exports.DeleteData = (req, res) => {
   const dataId = req.params.id;

   db.query('DELETE FROM opendataaccess WHERE Report_ID=?', [dataId], (err, result) => {
     if (err) {
       console.error('Error deleting Data:', err);
       res.status(500).json({ error: 'Internal Server Error' });
     } else {
       res.json({ message: 'Data deleted successfully', rowsAffected: result.affectedRows });
     }
   });
};

////////////////////////////////////Sus.Score//////////////////////////////////

exports.GetUserSus = (req, res) => {
   db.query('SELECT * FROM sustainabilityscore', (err, results) => {
        if (err) {
          console.error('Error fetching sustainabilityscore:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
};
exports.PostUserSus = (req, res) => {
  const userID = require('./Login');
    const { Score_ID, User_ID,Score_Value } = req.body;
    const Timestamp = new Date();
db.query('INSERT INTO sustainabilityscore (Score_ID , User_ID, Timestamp, Score_Value) VALUES (?,?, ?, ?)', [ Score_ID, userID,Timestamp,Score_Value], (err, result) => {
    if (err) {
      console.error('Error creating sustainabilityscore:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'sustainabilityscore created successfully', userId: result.insertId });
    }
  });

};
//db.query = INSERT INTO sustainabilityscore (Score_ID, User_ID, Timestamp, Score_Value) VALUES ('${Score_ID}', '${User_ID}', '${Timestamp}', '${Score_Value}'), (err, result) =>{
   

exports.UpdateUserSus = (req, res) => {
  const userID = require('./Login');
    const ScoreId = req.params.id;
    const { Score_ID, User_ID,Score_Value } = req.body;
    const Timestamp = new Date();
    db.query('UPDATE sustainabilityscore SET User_ID=?, Timestamp=?, Score_Value=? WHERE Score_ID=?', [UserID, Timestamp, Score_Value, ScoreId], (err, result) => {
      if (err) {
        console.error('Error updating sustainabilityscore:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'SustainabilityScore updated successfully', rowsAffected: result.affectedRows });
      }
    });
};
exports.DeleteUserSus = (req, res) => {
    const ScoreId = req.params.id;

    db.query('DELETE FROM sustainabilityscore WHERE Score_ID=?', [ScoreId], (err, result) => {
      if (err) {
        console.error('Error deleting sustainabilityscore:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'sustainabilityscore deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};



///////////////////////Enviromental data////////////////////////
exports.GetEnviromental = (req, res) => {
  db.query('SELECT * FROM environmentaldata', (err, results) => {
       if (err) {
         console.error('Error fetching environmentaldata:', err);
         res.status(500).json({ error: 'Internal Server Error' });
       } else {
         res.json(results);
       }
     });
};
exports.GetEnviromentalByUser = (req, res) => {
  const userID = require('./Login');
  db.query('SELECT * FROM environmentaldata WHERE User_ID=?', [userID ],(err, results) => {
       if (err) {
         console.error('Error fetching environmentaldata:', err);
         res.status(500).json({ error: 'Internal Server Error' });
       } else {
         res.json(results);
       }
     });
};
exports.PostEnviromental = (req, res) => {
 const userID = require('./Login');
 const Timestamp = new Date();

   const { Data_ID, User_ID, Air_Quality, Temperature, Humidity, Water_Quality, Biodiversity_Metrics } = req.body;
db.query('INSERT INTO environmentaldata (Data_ID, User_ID, Timestamp, Air_Quality, Temperature, Humidity, Water_Quality, Biodiversity_Metrics) VALUES (?,?, ?, ?,?,?,?,?)', [ Data_ID, userID,Timestamp ,Air_Quality, Temperature, Humidity, Water_Quality, Biodiversity_Metrics], (err, result) => {
   if (err) {
     console.error('Error creating environmentaldata:', err);
     res.status(500).json({ error: 'Internal Server Error' });
   } else {
     res.json({ message: 'environmentaldata created successfully'});
   }
 });

};

exports.UpdateEnviromental= (req, res) => {
  const userID = require('./Login');
    const dataId = req.params.id;
    const { Data_ID, User_ID, Air_Quality, Temperature, Humidity, Water_Quality, Biodiversity_Metrics } = req.body;
    const Timestamp = new Date();
    db.query('UPDATE environmentaldata SET User_ID =?, Timestamp=?, Air_Quality=?, Temperature=?, Humidity=?, Water_Quality=?, Biodiversity_Metrics=? WHERE Data_ID=?', [userID,Timestamp ,Air_Quality, Temperature, Humidity, Water_Quality, Biodiversity_Metrics, dataId], (err, result) => {
      if (err) {
        console.error('Error updating environmentaldata:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'environmentaldata updated successfully', rowsAffected: result.affectedRows });
      }
    });
};
exports.DeleteEnviromental = (req, res) => {
    const dataId = req.params.id;

    db.query('DELETE FROM environmentaldata WHERE Data_ID=?', [dataId], (err, result) => {
      if (err) {
        console.error('Error deleting environmentaldata:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'environmentaldata deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};






//////////////////////////////////////////////////////////////////////////////////////
/*const axios = require('axios');

const apiKey = '1a758f18c346bd26369bfbdaf9b9966e';
const cityName = 'Nablus'; // Replace with the desired city name

const apiUrl =`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

axios.get(apiUrl).then(response => {
    // Handle the response data here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error fetching data:', error);
  });
*/


  