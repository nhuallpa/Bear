
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , backbone = require('backbone')
    , Subject = require('./subject')
    , cache = require('memory-cache')
    , http = require('http');

var app = module.exports = express.createServer();
cache.put('houdini', 'disappear', 24*60*6000);

function initializeDomain() {

  cache = require('memory-cache');

  cache.put('subjectList', new Array());

  var matematica = new Subject({code:"66", name:"Matematica"});
  var fisica = new Subject({code:"63", name:"Fisica"});

  cache.get('subjectList').push(matematica);
  cache.get('subjectList').push(fisica);



}

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  initializeDomain();
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/subject/:code/subscribers', routes.subjectDetail);

app.get('/json/subject/:code/subscribers', routes.subjectSubscriberAll);

app.get('/subscriber', routes.subscriber);

app.post('/subscriber', routes.addSubscriber);

app.get('/json/subjects/', routes.subjectAll);



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
