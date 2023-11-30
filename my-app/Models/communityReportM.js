const db = require('../database.js');

db.query(createReport, (err, results) => {
  if (err) {
    console.error('Error creating User table:', err);
  } else {
    console.log('User table created successfully');
  }
});