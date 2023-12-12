const db = require('../path-to-your-database-connection-file');

db.query(createAlertTable, (err, results) => {
  if (err) {
    console.error('Error creating ALert table:', err);
  } else {
    console.log('Alert table created successfully');
  }
});