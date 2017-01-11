var express    = require('express');
var bodyParser = require('body-parser');
var http       = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

var jsonParser = bodyParser.json();

var dataServer = {
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
  res.json(dataServer.sentences);
});

app.get('/api/tchat/find', function(req, res){
  var max = parseInt(req.query.max) || 5;
  var index = dataServer.messages.length - max;

  if(index < 0) index = 0;

  res.json({
    max: max,
    messages: dataServer.messages.slice(index)
  });
});

app.post('/api/bot/add', jsonParser, function(req, res){
  var sentence = req.body;
  sentence.id = ++curentSentenceId;
  dataServer.sentences.push(sentence);
  res.json(sentence);
});

app.post('/api/Tchat/add', jsonParser, function(req, res){
  var message = req.body;
  message.id = ++curentMessageId;
  dataServer.messages.push(message);
  res.json(message);
});

app.post('/api/Tchat/update', jsonParser, function(req, res){
  var message = req.body;
  var response = {
    error: true,
    message: "message unknow"
  };
  for(var i = 0 ; i < dataServer.messages.length ; i++){
    if(dataServer.messages[i].id = message.id){
      dataServer.messages[i]= message;
      response.error = false;
      response.message= "message save";
      break;
    }
  }
  if(response.error)
      res.status(400);

  res.json(response);
});

server.listen(1337, function(){
  console.log('Server running');
});

//-----------------------------//

io.on('connection', function(socket){
  socket.on('message', function(data){
    console.log("New message : " + data);
    socket.broadcast.emit('newMessage', data);
  });
});
