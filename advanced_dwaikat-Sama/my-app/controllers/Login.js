

const express = require('express');
const db = require('../database.js');

//////////////////////////////
const http = require('http');
const { GetUser } = require('./UserControllers.js');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, World!\n');
});


////////////////////////////////

const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    const { Email, Password } = req.body; 
 
    // Query to find the user by email
    const query = 'SELECT * FROM user WHERE Email = ?';
    db.query(query, [Email], (err, results) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid Email or password' });
        }
  
        const user = results[0];
  
        // Compare hashed password
        bcrypt.compare(Password, user.Password, (error, isMatch) => {
            if (error) {
                console.error('Error comparing passwords', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid Email or password' });
            }

            // Password matches, user is authenticated
            loggedInUserId = user.User_ID;
            module.exports = global.loggedInUserId;
            return res.status(200).json({ message: 'Authentication successful' });
        });
    });
};
