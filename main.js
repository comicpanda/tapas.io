var express = require('express');
var app = express();


app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'about.html');
});

app.get('/help', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'help.html');
});

app.get('/privacy', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'privacy.html');
});

app.listen(8082, function (){
  console.log('start server');
});
