var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'index.html');
});

app.get('/help', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'help.html');
});

app.get('/publish', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'publish.html');
});

app.get('/privacy', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'privacy.html');
});

app.get('/policies/privacy', function (req, res) {
  res.redirect('/privacy');
});

app.get('/terms', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'terms.html');
});

app.get('/error-404', function (req, res) {
  res.sendFile(__dirname + '/views/' + '404.html');
});

app.get('/error-500', function (req, res) {
  res.sendFile(__dirname + '/views/' + '500.html');
});
app.listen(8082, function (){
  console.log('start server');
});
