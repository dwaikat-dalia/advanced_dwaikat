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


exports.SignUser = (req, res) => {
    const { User_ID,Username, Password, Email } = req.body;

     
      
    if (!Username || !Email || !Password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      // Check if the email already exists
      const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
      db.query(checkEmailQuery, [Email], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    
        if (results.length > 0) {
          // Email already exists
          return res.status(409).json({ message: 'Email is already taken' });
        }
    
        // Email is not taken, proceed with user creation
        const insertUserQuery = 'INSERT INTO user (Username, Email, Password) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [Username, Email, Password], (err, result) => {
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'User created successfully' });
        });
      });
    
    
};