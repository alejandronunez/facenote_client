var path = require('path');
var express = require('express');

var app = express();
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/dist', "/index.html"));
});
console.log(__dirname + '/dist');
app.use(express.static( __dirname + '/dist'));
app.listen(process.env.PORT || 5000);
