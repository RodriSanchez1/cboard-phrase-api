//express app file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
var logger = require('morgan');
const dbConnect = require('./config/db');
const app = express();

dbConnect();
app.use(cors());
app.use(logger('dev')); //http logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
