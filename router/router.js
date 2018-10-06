var express = require('express');
var bodyParser = require('body-parser');
var controller = require('../controllers/controller.js');
var app = require('../app');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/api",function(req,res) {
    res.send("This is the home page for the API");
})

router.post('/api/profile', controller.createProfile);

router.post('/api/updateProfile',controller.updateProfile);

router.get('/api/getHistory?', controller.getHistory);

router.post('/api/search',controller.search);

router.post('/api/route',controller.direction);


module.exports = router;