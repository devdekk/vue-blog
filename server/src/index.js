//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// enhance security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors({credentials: true, origin: true}));

// log HTTP requests
app.use(morgan('combined'));

// get routes
app.use('/blog-posts', routes);

module.exports = app;