const db = require('../path-to-your-database-connection-file');

db.query(createUserTable, (err, results) => {
  if (err) {
    console.error('Error creating User table:', err);
  } else {
    console.log('User table created successfully');
  }
});