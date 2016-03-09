var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var ua = req.headers['user-agent'];

  console.log(__origin(ua))

  res.sendFile(__dirname + '/' + 'index.html');

  //app.render('index', {name: 'name'}, function (err, html) {
  //  console.log('render')
  //});
});

app.listen(8082, function (){
  console.log('start server');
});


var __origin = function (ua) {
  var $ = {};

  if (/like Mac OS X/.test(ua)) {
    $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    $.iPhone = /iPhone/.test(ua);
    $.iPad = /iPad/.test(ua);
  } else if (/Android/.test(ua)) {
    $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
  } else {
    $.Web = true;
  }

  return $;
};