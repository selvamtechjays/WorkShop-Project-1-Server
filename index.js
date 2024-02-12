
// Express.js framework for building web applications
const express = require('express'); 
// Loading environment variables from a .env file
require("dotenv").config(); 
// Middleware for enabling Cross-Origin Resource Sharing (CORS)
const cors = require('cors'); 
// Middleware for parsing incoming request bodies
const bodyParser = require('body-parser'); 

//mongoose connection
const mongoose = require('./db/dbConnection')



// Creating an instance of the Express application
const app = express();

// Parsing incoming request bodies as JSON
app.use(bodyParser.json());

// Enabling CORS for all routes
app.use(cors());

//Root route for printing hello world
app.get('/', (req, res) => {
  res.send("Hello world!");
});


//Port Defining
const PORT =  3000;
//Server Starting at port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
