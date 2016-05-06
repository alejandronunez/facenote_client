var path = require('path');
var express = require('express');

var app = express();
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/app', "/index.html"));
});
app.use(express.static( __dirname + '/app'));
app.listen(process.env.PORT || 5000);
