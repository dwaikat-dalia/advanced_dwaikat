const express = require('express');
const app = express();
const userRoutes = require('./UserRoutes.js'); // Adjust the path if needed
const Alertroute = require('./Alertroute.js'); // Adjust the path if needed
const OtherRoutes=require('./OtherRoutes.js'); // Adjust the path if needed

app.use(express.json()); // Middleware to parse JSON bodies  

app.use('/api', userRoutes); // Mount your user routes under the '/api' path
app.use('/api', Alertroute); // Mount your user routes under the '/api' path
app.use('/api', OtherRoutes); // Mount your user routes under the '/api' path

const PORT = process.env.PORT || 3001; // Use the provided port or default to 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});