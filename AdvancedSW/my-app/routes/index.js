const express = require('express');
const app = express();
const userRoutes = require('./userRoutes.js'); // Adjust the path if needed

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api', userRoutes); // Mount your user routes under the '/api' path

const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
