var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

var server = {
  sentences : [],
  messages  : []
};
var curentSentenceId = 0;
var curentMessageId  = 0;

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/api/bot/find', function(req, res){
  res.json(server.sentences);
});

app.get('/api/tchat/find', function(req, res){
  var max = parseInt(req.query.max) || 5;
  var index = server.messages.length - max;

  if(index < 0) index = 0;

  res.json({
    max: max,
    messages: server.messages.slice(index)
  });
});

app.post('/api/bot/add', jsonParser, function(req, res){
  var sentence = req.body;
  sentence.id = ++curentSentenceId;
  server.sentences.push(sentence);
  res.json(sentence);
});

app.post('/api/Tchat/add', jsonParser, function(req, res){
  var message = req.body;
  message.id = ++curentMessageId;
  server.messages.push(message);
  res.json(message);
});

app.post('/api/Tchat/update', jsonParser, function(req, res){
  var message = req.body;
  var response = {
    error: true,
    message: "message unknow"
  };
  for(var i = 0 ; i < server.messages.length ; i++){
    if(server.messages[i].id = message.id){
      server.messages[i]= message;
      response.error = false;
      response.message: "message save";
      break;
    }
  }
  if(response.error)
      res.status(400);

  res.json(response);
});

app.listen(1337, function(){
  console.log('Server running');
});
