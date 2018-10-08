var mongoose = require('mongoose');
var server = require('../app');


var UserInfo = mongoose.model('profile');
var exports = module.exports = {};


exports.delHistory = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.history.forEach(function(element,index) {
            if (element.id == req.body.id) {
                user.history.splice(index,1);
                user.save(function(err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(403);
                    }
                })
            }
        })
    })
}

exports.getHistory = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.history.forEach(function(element) {
            if (element.id == req.body.id) {
                res.send(element);
            }
        })
    })
}

exports.updateHistory = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.history.forEach(function(element) {
            if (element.id == req.body.id) {
                element[req.body.key] = req.body.value;
                user.save(function (err) {
                    if (!err) {
                        res.sendStatus(202);
                    } else {
                        res.sendStatus(403);
                    }
                })
            }
        })
    })
}

exports.history = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        if(!err) {
            var history = {
                "id":req.body.id,
                "date": {
                    "year":req.body.year,
                    "month":req.body.month,
                    "day":req.body.day
                },
                "location":{
                    "name":req.body.name,
                    "latitude":req.body.latitude,
                    "longitude":req.body.longitude,
                    "rating":req.body.rating
                },
                "tripRating":req.body.tripRating
            }

            user.history.push(history);
            user.save(function (err) {
                if (!err) {
                    res.sendStatus(201);
                } else {
                    res.send(user.history);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
};

exports.plan = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        if(!err) {
            var plan = {
                "id":req.body.id,
                "datetime": {
                    "year":req.body.year,
                    "month":req.body.month,
                    "day":req.body.day,
                    "hour":req.body.hour,
                    "minute":req.body.minute
                },
                "location":{
                    "name":req.body.name,
                    "latitude":req.body.latitude,
                    "longitude":req.body.longitude,
                }
            }

            user.schedule.push(plan);
            user.save(function (err) {
                if (!err) {
                    res.sendStatus(201);
                } else {
                    res.send(user.plan);
                }
            });
        } else {
            res.sendStatus(403);
        }
    });
};

exports.delPlan = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.schedule.forEach(function(element,index) {
            if (element.id == req.body.id) {
                user.schedule.splice(index,1);
                user.save(function(err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(403);
                    }
                })
            }
        })
    })
}

exports.getPlan = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.schedule.forEach(function(element) {
            if (element.id == req.body.id) {
                res.send(element);
            }
        })
    })
}

exports.updatePlan = function(req,res) {
    UserInfo.findOne({"userID": req.body.userID},function(err,user) {
        user.schedule.forEach(function(element) {
            if (element.id == req.body.id) {
                element[req.body.key] = req.body.value;
                user.save(function (err) {
                    if (!err) {
                        res.sendStatus(202);
                    } else {
                        res.sendStatus(403);
                    }
                })
            }
        })
    })
}


exports.createProfile = function(req,res) {

    var newProfile = new UserInfo({
        "userID":req.body.userID,
        "survey":{
            "textSize":req.body.textSize,
            "walking": req.body.walking,
            "userData": req.body.userData,
        }
    });

    UserInfo.findOne({userID: req.body.userID},function(err,user) {
            if (err)  {
                res.sendStatus(403);
                return null;
            }
            if (user != null) {
                res.send(user);

            } else {
                newProfile.save(function (err) {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        res.sendStatus(201);
                    }
                })
            }
        })
    };

exports.updateProfile = function(req,res) {
    UserInfo.findOne({userID:req.body.userID}, function(err, result) {
        if (err) {
            res.sendStatus(403);
            return null;
        } else {
            result["survey"][req.body.key] = req.body.value;
            result.save(function (err) {
                if (!err) {
                    res.sendStatus(202);
                } else {
                    res.sendStatus(403);
                }
            })
        }
    })
}

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
            for (var i = 0;i < obj.body.routes[v].legs.length; i++)
            {
                for (var j =0;j< obj.body.routes[v].legs[i].steps.length; j++) {
                    result.push(obj.body.routes[v].legs[i].steps[j].maneuver);
                }
            }
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


