var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.listen(8082, function (){
  console.log('start server');
});
