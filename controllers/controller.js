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

exports.direction = function(req,res) {
    const request = require('request')

    var url = "https://api.mapbox.com/directions/v5/mapbox/walking/"
    url += req.body.curLongitude + "," + req.body.curLatitude + ";";
    url += req.body.desLongitude + "," + req.body.desLatitude + "?";
    url += "steps=true&access_token=" + process.env.mapboxapi;
    console.log(url);
    request(url,{json:true}, function(err,obj) {
        if (err) res.send(err);
        var result = []
        for (var v = 0; v < obj.body.routes.length;v++ ) {
            var routes = []
            for (var i = 0;i < obj.body.routes[v].legs.length; i++)
            {
                var legs = []
                for (var j =0;j< obj.body.routes[v].legs[i].steps; j++) {
                    legs[j] = obj.body.routes[v].legs[i].steps.intersections.maneuver;
                }
                routes[i] = legs;
            }
            result[v] = routes;
        }

            res.send(result);

    })


}
exports.search = function(req,res) {
    const request = require('request')

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    url += "location=" + req.body.latitude + "," + req.body.longitude + "&";
    url += "radius=1500&";
    url += "type=" + req.body.pType + "&";
    url += "opennow=true&";
    url += "key=" + process.env.gapi;
    console.log(url);
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
        var parent = {"status":obj.body.status,"results":result};
        res.send(parent);
    })
};


