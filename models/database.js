var mongoose = require('mongoose');

// use "heroku local" to run the application or change the value
//var db_url = process.env.dburl; // database url
var db_url = "ds225608.mlab.com:25608/";
//var db_account = process.env.dbac; // database account
var db_account = "eldermaps";
//var db_password= process.env.dbpw; // database password
var db_password = "eldermap123";
var url = 'mongodb://'+db_account+':'+db_password+'@'+ db_url + db_account;

mongoose.connect(url,{useNewUrlParser: true}).then(
    () => {console.log("Connected to database")},
    err => {console.log("Error: Failed to connect to database")}
);

require('./user.js');