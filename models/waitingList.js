var mongoose = require('mongoose');
var UserInfo = mongoose.Schema(
    {
        "ip" : {type: String},
        "port" : {type: Number}
    }
);
mongoose.model('waitingList',UserInfo);