var request = require('request');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
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

app.get('/policies/privacy', function (req, res) {
  res.redirect('/privacy');
});

app.get('/tos', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'tos.html');
});

app.get('/genre', function (req, res) {
///series/:humanUrl/ep:scene
  var humanUrl = req.params.humanUrl,
    scene = req.params.scene;

  // TODO to test

  request(
    {url: 'https://api.tapas.io/v3/series/526/episodes/37571',
      json: true,
      headers:
      {'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/panda+json',
        'X-Device-Type': 'IOS',
        'X-Device-Uuid': '8042DF68-36CC-4C2A-B7E1-7BD8D5F130D5',
        'X-Auth-Token': 'eyJhbGciOiJIUzUxMiJ9.eyJwIjoiRVRiQyIsImMiOjE0NTYzODIyNjEwMDAsImQiOiI4MDQyREY2OC0zNkNDLTRDMkEtQjdFMS03QkQ4RDVGMTMwRDUiLCJ0IjoiSU9TIiwidiI6IjYiLCJoIjoiTiIsImkiOiIyNDAyNjEifQ.wbkCPCHg9zuxd-wrDc2Fi48oxSF8gngqIlQjZ-YSeWjkgxgw5EkyUihUMan5DLD2JwISKeP-G2QC2qt1SWTvSQ'
      }
    },

    function(err, response, json) {
      if (err) {
        res.sendFile(__dirname + '/views/' + 'error.html');
      } else {

        res.render('series', {
          episode: json
        });
      }
  });

// share episode page
});

app.get('/series/:humanUrl', function (req, res) {
// share series page

  var humanUrl = req.params.humanUrl;


  res.send('series');
});

app.listen(8082, function (){
  console.log('start server');
});
