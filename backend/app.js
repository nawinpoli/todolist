require("dotenv").config();
const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://6534433023:75Hp65TW@cluster0.6n7wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(()=> console.log('connection succes'))
        .catch((err)=>console.error(err))

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

var app = express();

// view engine setup
app.use(bodyParser.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
