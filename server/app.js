'use strict';

var express = require('express');
var http = require('http');

var app = express();

try {
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser({ uploadDir: '/tmp' }));
  app.use(express.methodOverride());
  // app.use('/images', express['static'](__dirname + '/../public/images/'));

  app.use(require('less-middleware')(__dirname + '/../client/app'));
  app.use('/', express['static'](__dirname + '/../client/app'));
  app.use(express.errorHandler());

  app.use(app.router);
}
catch(error){
  console.error(error);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
