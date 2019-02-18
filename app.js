var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.configure(function() {
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/public', { maxAge: hourMs, icons:true}));
  app.use(express.directory(__dirname + '/public', { maxAge: hourMs, icons:true}));
  app.use(express.errorHandler());
});

app.listen(port);
