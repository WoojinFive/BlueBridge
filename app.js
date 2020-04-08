require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');

require('./server/models/feed');
require('./server/models/user');
require('./server/models/schedule');

const app = express();

//cors
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point to static path to dist
// __dirname is retrieved from javascript as the directory name of the location of this file.
app.use(express.static(path.join(__dirname, 'dist')));

// set the route of the templates and give it to express
app.set('views', `${__dirname}/server/views`);
// Tell express's engine what file format we are targeting and what
// library to use, in this case we use EJS and it;d renderfile engine
app.engine('html', require('ejs').renderFile);
// And lastly we set the 'view engine' to be HTML
app.set('view engine', 'html');

// DB Connection
mongoose
  .connect(
    'mongodb+srv://bluebridge:nscccapstone@blue-bridge-25rgb.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'bluebridge' }
  )
  .then(() => console.log('Connected to Mongo...'))
  .catch(err => console.log(err));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

/**
 * Here we make a variable Routes equal to the routes.js file located in the server folder.
 * In the routes.js file we will make a function that returns all routes for the entire application
 * We then call the function in the Routes variable, giving it the express app variable and __dirname
 */
const Routes = require('./server/routes'); // Import all route endpoints
Routes(app, __dirname);

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// CREATE HTTP SERVER
const server = http.createServer(app);

// LISTEN ON PORT
server.listen(port, () => console.log(`API RUNNING ON LOCALHOST: ${port}`));
