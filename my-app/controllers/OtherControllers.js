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
    const {Resource_ID, Title,Content,Timestamp,Author,Tags } = req.body;

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
    const {Resource_ID, Title,Content,Timestamp,Author,Tags } = req.body;

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