
const express = require('express');
 
const db = require('../database.js');

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
    const { Access_ID, Researcher_ID, Timestamp,  Data_Request_Details, status } = req.body;

    // Remove Report_ID from here since it's an AUTO_INCREMENT field in the table
    db.query('INSERT INTO opendataaccess (Access_ID, Researcher_ID, Timestamp, Data_Request_Details, status) VALUES (?,?,?,?,?)', [Access_ID, Researcher_ID, Timestamp, Data_Request_Details, status], (err, result) => {
        if (err) {
            console.error('Error creating CommunityReports:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Report created successfully', dataId: result.insertId });
        }
    });
};

exports.UpdateData = (req, res) => {
    const dataId = req.params.id;
    const { Access_ID, Researcher_ID, Timestamp,  Data_Request_Details, status } = req.body;  
    db.query('UPDATE opendataaccess SET   Researcher_ID=?, Timestamp=?, Data_Request_Details=? ,status=?  WHERE Access_ID=?', [Researcher_ID,User_ID, Timestamp, Data_Request_Details ,  status], (err, result) => {
      if (err) {
        console.error('Error updating Reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Report updated successfully', rowsAffected: result.affectedRows });
      }
    });
};
exports.DeleteData = (req, res) => {
    const dataId = req.params.id;

    db.query('DELETE FROM opendataaccess WHERE Report_ID=?', [dataId], (err, result) => {
      if (err) {
        console.error('Error deleting Report:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'User deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};
 