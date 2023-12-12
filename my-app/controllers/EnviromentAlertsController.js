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



exports.GetAlerts = (req, res) => {
 //   console.log("we are here ");
   db.query('SELECT * FROM environmentalalerts', (err, results) => {
        if (err) {
          console.error('Error fetching Alerts:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
};
exports.PostAlerts = (req, res) => {
    const {ALert_ID, User_ID, ALert_Message } = req.body;
    const Timestamp = new Date();
    db.query('INSERT INTO environmentalalerts (ALert_ID ,User_ID ,Timestamp,ALert_Message) VALUES (?,?, ?, ?)', [ALert_ID , User_ID, Timestamp, ALert_Message], (err, result) => {
      if (err) {
        console.error('Error creating Alert:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Alert added successfully', ALert_ID: result.insertId });
      }
    });
};
exports.UpdateAlerts = (req, res) => {
    const ALertid = req.params.id;
    const {ALert_ID, User_ID,Timestamp, ALert_Message } = req.body;

    db.query('UPDATE environmentalalerts SET User_ID=?, Timestamp=?, ALert_Message=? WHERE ALert_ID=?', [User_ID, Timestamp, ALert_Message,ALertid], (err, result) => {
      if (err) {
        console.error('Error updating alert:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Alert updated successfully', rowsAffected: result.affectedRows });
      }
    });
};
exports.DeleteAlerts = (req, res) => {
    const ALertid = req.params.id;

    db.query('DELETE FROM environmentalalerts WHERE ALert_ID=?', [ALertid], (err, result) => {
      if (err) {
        console.error('Error deleting Alert:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'ALert deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};