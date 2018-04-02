// app.js
var express = require('express');
var app = express();
var db = require('./db');
// ADD THESE TWO LINES
var ItemController = require('./ItemController');
var UserController = require('./UserController');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*")
    next();
});

app.use('/items', ItemController);
app.use('/auth', UserController);
module.exports = app;