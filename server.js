/**
 * This file (server.js) is the backend set up for this application.
 */

// Require necessary dependencies for application
// Express handles routing and uses any specified middleware to perform tasks
// See the Express.js NPM documentation for more information:
// https://www.npmjs.com/package/express
const express = require('express');

// Mongoose will interact with your mongo database through schema objects known as 'models'
// Models define a blueprint of how the data should be entered and stored in your mongo database
// note: MongoDB by design is schema-less, however, by adding Mongoose to your application it technically
// removes this feature. There are ways to... 'override' this, but we won't get into that right now.
// See the Mongoose.js documentation for more information:
// http://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

// Body Parser is crucial for reading data submitted through POST requests to the backend / express routes
// It extracts the information from the request and attaches it to the express request body object (i.e. - req.body)
// See this stackoverflow article for a better description: 
// https://stackoverflow.com/a/43626891
const bodyParser = require('body-parser');

// Path module is used to create absolute paths to any specified folders/files in our application
// This is particularly useful when you build your projects because files or paths can get moved
const path = require('path');
// FROM JASON
// The other place path is really useful is for running the code on different environmnets. Some versions of linux are
// not as strict about case-sensitivity (like Windows) in paths. Windows also uses different path separators (\ instead of /).

// Initialize an instance of express and attach it to const app
const app = express();
// Specify port for application to listen on 
const PORT = 8080;

// There are several things going on with this:
// 1: express.static gives access to any specified folders in our application
//    In this scenario, we are gaining access to the public folder and any files within it
//    NOTE: If we didn't do this, any CSS or JavaScript files created for our application cannot
//          be used EVEN if you directly link to them in the index.html file
// 2: We use the path module to join the current directory that the server file lives in
//    with the public folder. This creates an absolute path based on variable/relative parts (think about them being 'merged') 
//    between the directory where this (server.js) file exists and the public folder
app.use(express.static(path.join(__dirname, 'public')));


// Check out this Quora thread to gain a better understanding of how body parser interacts with express
// https://www.quora.com/What-exactly-does-body-parser-do-with-express-js-and-why-do-I-need-it
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a variable to store the MongoURI path to your database connection
// To specify a database to use, add the name of the database to the end of your MongoURI
// monguri/[dbName]
const mongoURI = 'mongodb://127.0.0.1:27017/userdb';

// Require in model files
require('./models/User');

// After requiring in your models, connect mongoose to your Mongo database
mongoose.connect(mongoURI);

// require api routes to handle database interaction
require('./routes/api-routes')(app);

app.listen(PORT, () => {
  console.log('app listening on PORT: ', PORT);
});