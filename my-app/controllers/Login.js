

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
////////////////////////////////


/*exports.GetUser = (req, res) => {
 //   console.log("we are here ");
 const { User_ID,Password } = req.body;

   db.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error fetching users:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
};*/






//////////////////////////////////////////////////////////


//const jwt = require('jsonwebtoken');


exports.getLogin= (req, res)=> {

    const { Email , Password } = req.body; 

    const secretKey = '1234';

    // Find the user in the database
    const query = 'SELECT * FROM user WHERE Email = ?';
    db.query(query, [Email], (err, results) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // Check if the user exists
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid Email or password' }); // invalid username 
        return;
      }
  
      const user = results[0];
  
      // Compare the provided password with the password in the database
      if (Password != user.Password) {
        res.status(401).json({ error: 'Invalid Email or password' }); // invalid password 
        return;
      }
      res.status(200).json( 'Welcome' ); // invalid password 
      return;
      // Create a JWT token
      //const token = jwt.sign({ id: user.id, Email: user.Email }, secretKey);
  
      // Send the token back to the client
      //res.json({ token });
    });
}
  
