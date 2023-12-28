// app.js or wherever your main Express app is defined
const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', userRoutes); // Prefix all user routes with '/api'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// app.js or wherever your main Express app is defined
const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const Alertroute = require('./routes/Alertroute');
const OtherRoutes=require('./routes/OtherRoutes'); 

const app1 = express();
const port1 = 3000;

app.use(express.json());

app.use('/api', userRoutes); // Prefix all user routes with '/api'
app.use('/api', Alertroute); // Prefix all user routes with '/api'
app.use('/api', OtherRoutes); // Prefix all user routes with '/api'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
