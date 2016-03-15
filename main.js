const PORT=8082;
var http = require('http'),
  client = require('twilio')(process.env.SID, process.env.TOKEN),
  qs = require('querystring');


var server = http.createServer((req, res) => {
  if(req.method === 'POST') {
    var q, body='';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if(!!body) {
        try {
          q = qs.parse(body.toString());
          if(/^\d{10}$/.test(q.to))  {
            sendSMS(q.to, function(isErr) {
              res.writeHead(isErr? 400 : 200, {'Content-Type': 'application/json'});
              res.end("{}");
            });
          }
        } catch(e) {
          console.error(e);
        }
      } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end("{}");
      }
    });
  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.end("{}");
  }
});

//15005550006 / 14242382727
var sendSMS = function (to, cb) {
    client.sendMessage({
        to:'+1' + to,
        from: '+14242382727',
        body: 'Download Tapas: https://tapas.io/app'
    }, function(err, responseData) {
      cb(!!err);
    });
}
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
