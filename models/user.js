var mongoose = require('mongoose');
var UserInfo = mongoose.Schema(
    {
        "survey": {
            "canWalk": {type: Boolean, default: true},
            "walkFast": {type: Boolean, default: true}
        },
        "history": [{
            "name": {type: String},
            "location": {type: String},
            "rating": {type: Number}
        }]
    }
);
mongoose.model('profile',UserInfo);