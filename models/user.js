var mongoose = require('mongoose');
var UserInfo = mongoose.Schema(
    {
        "userID": {type: String, required:true},
        "userType" : {
            type: Number,
            enum: [0,1],
            default: 0
        },
        "survey" : {
            "completed": {type:Number,default: 0},
            "textSize" : {
                type: Number,
                enum: [0,20,25,30,35],
                default: 25
            },
            "walking" : {
                type: Number,
                enum: [0,5,10,15,20],
                default: 10
            },
            "userData" : {type: Number,default: 0}
        },
        "schedule" : [{
            "id": {type: Number},
            "datetime": {
                "year" : {type: Number},
                "month" : {type: Number},
                "day" : {type: Number},
                "hour": {type: Number},
                "minute" : {type: Number}
            },
            "location": {
                "name" : {type: String},
                "latitude": {type: Number},
                "longitude": {type: Number}
            }
        }],
        "history": [{
            "id": {type: Number, required: true},
            "date": {
                "year" : {type: Number, required: true},
                "month" : {type: Number, required: true},
                "day" : {type: Number, required: true}
            },
            "location": {
                "name": {type: String, required: true},
                "latitude": {type: Number, required: true},
                "longitude": {type: Number, required: true},
            },
            "locationRating": {type: Number, required: true},
            "tripRating": {type: Number, required: true}
        }]
    }
);
mongoose.model('profile',UserInfo);