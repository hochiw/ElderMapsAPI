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

exports.search = function(req,res) {
    const request = require('request')

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    url += "location=" + req.query.location + "&";
    url += "radius=" + req.query.radius + "&";
    url += "type=" + req.query.pType + "&";
  //  url += "key=" + process.env.gapi;
    url += "key=AIzaSyAFY7Mtw3BFobTctWk_cSVsamHGokfHFvA";
    request(url,{
        json:true}, function (err,obj) {
        if (err) res.send(err);
        res.send(obj.body);
    })
    };

exports.createProfile = function(req,res) {
    var profile = new UserInfo();
    profile.save(function(err, result) {
        if (err) throw err;
        res.send(result)
    });
};


