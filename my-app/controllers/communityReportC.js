
const express = require('express');
 
const db = require('../database.js');

exports.GetReport = (req, res) => { 
   db.query('SELECT * FROM CommunityReports', (err, results) => {
        if (err) {
          console.error('Error fetching CommunityReports:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
};
exports.PostReport = (req, res) => {
    console.log(req.body); 
    const { Report_ID, User_ID, Timestamp, Report_Message, Environmental_Issue_Type, Location } = req.body;

    // Remove Report_ID from here since it's an AUTO_INCREMENT field in the table
    db.query('INSERT INTO communityreports (Report_ID, User_ID, Timestamp, Report_Message, Environmental_Issue_Type, Location) VALUES (?,?,?,?,?,?)', [Report_ID, User_ID, Timestamp, Report_Message, Environmental_Issue_Type, Location], (err, result) => {
        if (err) {
            console.error('Error creating CommunityReports:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Report created successfully', ReportId: result.insertId });
        }
    });
};

exports.UpdateReport = (req, res) => {
    const ReportId = req.params.id;
    const { User_ID, Timestamp, Report_Message, Environmental_Issue_Type, Location } = req.body;
  
    db.query('UPDATE communityreports SET  User_ID=?, Timestamp=?, Report_Message=? ,Environmental_Issue_Type=? ,Location=?  WHERE Report_ID=?', [ User_ID, Timestamp, Report_Message ,  Environmental_Issue_Type , Location], (err, result) => {
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
        res.json({ message: 'User deleted successfully', rowsAffected: result.affectedRows });
      }
    });
};
 