'use strict';

var express = require('express')
  , cors = require('cors')
  ;

var app = express();
app.use(cors());

app.use(express.static(__dirname + '/www'));

// app.options("*", function (req, res) {
//   // CORS
//   res.writeHead(204);
//   res.end();
// });

// Used for App health checking
app.get('/sys/info/ping', function(req, res) {
  res.end('"OK"');
});

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
module.exports = server;
