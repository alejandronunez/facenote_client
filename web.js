var path = require('path');
var express = require('express');

var app = express();

app.use('/scripts', express.static(__dirname + '/app/scripts'));
app.use('/images', express.static(__dirname + '/app/images'));
app.use('/styles', express.static(__dirname + '/app/styles'));
app.use('/views', express.static(__dirname + '/app/views'));
app.use('googlef75c21a1a476ba5f.html', express.static(__dirname + 'googlef75c21a1a476ba5f.html'));

app.get("*", function (req, res) {
    //res.sendFile(path.join(__dirname + '/app', "/index.html"));
   res.sendFile('/app/index.html', { root: __dirname });
});
app.use(express.static( __dirname + '/app'));
app.listen(process.env.PORT || 5000);
