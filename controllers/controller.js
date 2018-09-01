var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var server = require('../app');


var UserInfo = mongoose.model('profile');
var exports = module.exports = {};

exports.getProfile = function(req,res) {
    UserInfo.findOne({_id: req.query.id},function(err,user) {
        if(!err) {
            res.send(user);
        }
    });
};

exports.getHistory = function(req,res) {
    UserInfo.findOne({_id: req.query.id},function(err,user) {
        if(!err) {
            res.send(user.history);
        }
    });
};

exports.createProfile = function(req,res) {
    var profile = new UserInfo();
    profile.save(function(err, result) {
        if (err) throw err;
        res.send(result)
    });
};

exports.search = function(req,res) {
    const request = require('request')

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    url += "location=" + req.query.location + "&";
    url += "radius=" + req.query.radius + "&";
    url += "type=" + req.query.pType + "&";
    url += "opennow=true&";
    url += "rankby=distance&";
    url += "key=" + process.env.gapi;
    request(url,{
        json:true}, function (err,obj) {
        if (err) res.send(err);
        var result = [];
        for (var i = 0;i < obj.body.results.length; i++) {
            if (obj.body.results[i].opening_hours.open_now == false) continue;
            result[i] = {
                "name":obj.body.results[i].name,
                "address":obj.body.results[i].vicinity,
                "location":obj.body.results[i].geometry.location,
                "rating":obj.body.results[i].rating
            }
        }
        res.send(result);
    })
};


