var mongoose = require('mongoose');
var UserInfo = mongoose.Schema(
    {
        "isHelper" : {type: Boolean, default: false},
        "condition": {
            "walkPace": {type: Number, default: 1},
            "hasCar": {type: Boolean, default: false}
        },
        "history": [{
            "name": {type: String},
            "latitude": {type: Number},
            "longitude": {type: Number},
            "rating": {type: Number},
            "time": {type: Date, default: Date.now}
        }]
    }
);
mongoose.model('profile',UserInfo);