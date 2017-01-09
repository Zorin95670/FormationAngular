var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function(res, res){
  res.render('index.ejs');
});

app.use('/public', express.static(__dirname + '/public'));

app.listen(1337, function(){
  console.log('Server running');
});
