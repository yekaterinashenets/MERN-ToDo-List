// UserController.js
var express = require('express');
var assert = require('assert');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/signup', function (req, res) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function (err, user) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(user);
    });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        
        res.status(200).send(users);
    });
});

router.post('/login', function (req, res) {
    if (req.body.name && req.body.password) {
        User.findOne({'name': req.body.name, 'password': req.body.password}, function (err, user) {
            if (err) return res.status(500).send(err);
            if (!user) return res.status(404).send("There is no user with such data.");
            res.status(200).send(user);
        });
    } else {
        return res.status(400).send("Both fields are required.");
    }
    
});

module.exports = router;