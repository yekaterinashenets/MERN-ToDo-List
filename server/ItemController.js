// ItemController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Item = require('./Item');

// CREATES A NEW ITEM
router.post('/', function (req, res) {
    Item.create({
            userId: req.body.userId,
            name : req.body.name,
            description : req.body.description,
            isDone : false
        }, 
        function (err, item) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(item);
        });
});

// RETURNS ALL THE ITEMS IN THE DATABASE
router.get('/:userId', function (req, res) {
    Item.find({'userId': req.params.userId}).sort({ name: 1 }).exec(function (err, items) {
        if (err) return res.status(500).send("There was a problem finding the items.");
        res.status(200).send(items);
    })
    // Item.find({'userId': req.params.userId}, function (err, items) {
    //     if (err) return res.status(500).send("There was a problem finding the items.");
    //     res.status(200).send(items);
    // });
});

// DELETES A ITEM FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Item.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) return res.status(500).send("There was a problem deleting the item.");
        res.status(200).send("Item "+ item.name +" was deleted.");
    });
});

// UPDATES A SINGLE ITEM IN THE DATABASE
router.put('/:id', function (req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, item) {
        if (err) return res.status(500).send("There was a problem updating the item.");
        res.status(200).send(item);
    });
});

// // RETURNS ALL THE ITEMS IN THE DATABASE
// router.get('/', function (req, res) {
//     Item.findOne({"name": 'lalalallaa'}).
//     populate('userId').
//     exec(function (err, item) {
//       if (err) return 'err';
//       console.log(item);
//       res.status(200).send(item);
//     });
//     // Item.findOne({'name': 'lalalallaa'}, function (err, item) {
//     //     if (err) return res.status(500).send("There was a problem finding the items.");
//     //     res.status(200).send(item);
//     // });
// });

module.exports = router;