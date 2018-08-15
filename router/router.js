var express = require('express');
var bodyParser = require('body-parser');
var controller = require('../controllers/controller.js');
var app = require('../app');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/api",function(req,res) {
    res.send("Fuck u");
})
router.post('/register', controller.createUser);

router.get('/account/settings/changeusername', function(req,res) {
    controller.getUser(req,function(err,user) {
        if(app.cookieCheck(req, res) && !err) {
            var message = null;
            if (req.query['msg']) {
                message = msgs[req.query['msg']]
            }
            var username = user.username;
            res.render('changeattribute', {
                current: username,
                msg: message,
                operation: "Username",
                name: username
            });
        }
        else {
            res.redirect('/login');
        }
    });

});

module.exports = router;