var express = require('express');
var bodyParser = require('body-parser');
var app = express();


require("./models/database.js");


var router = require('./router/router.js');

app.use('/',router);
app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));