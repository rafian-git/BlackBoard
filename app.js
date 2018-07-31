var express = require('express');
var path = require('path');
var app = express();
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var c = 0;
var server = app.listen(port, function(){
	console.log('Started @ Port : ' + port);
});
var socket = require('socket.io');
var io = socket(server);



io.sockets.on('connection', function(socket){

    console.log(c + ' users connected');
    c++;

		//chat------------
		console.log('made socket connection', socket.id);

			// Handle chat event
			socket.on('chat', function(data){
					// console.log(data);
					io.sockets.emit('chat', data);
			});

			// Handle typing event
			socket.on('typing', function(data){
					socket.broadcast.emit('typing', data);
			});
		socket.on('disconnect', function(){
			console.log('user disconnected : ', socket.id);
		});

		//chat ends----------

    socket.on('msgS',function(data){

    socket.broadcast.emit('msgR',data);

    });

		socket.on('txData',function(pDataS){

    socket.broadcast.emit('txData',pDataS);

    });

		socket.on('val',function(x){

    socket.broadcast.emit('val',x);

    });


    socket.on('mouseS',function(pos){
      socket.broadcast.emit('mouseR',pos);


      });

			socket.on('text',function(textData){

	      socket.broadcast.emit('text',textData);

	      });

			socket.on('eraseData',function(erPos){
	      socket.broadcast.emit('eraseData',erPos);

	      });
			socket.on('tempInner',function(tempInner){

				socket.broadcast.emit('tempInner',tempInner);

				});

			socket.on('imgPos',function(imgPos){

				socket.broadcast.emit('imgPos',imgPos);

			});
			socket.on('imgSize',function(imgSize){

				socket.broadcast.emit('imgSize',imgSize);

			});
			socket.on('audio',function(audio){
				console.log(audio);
				socket.broadcast.emit('audio',audio);

			});
  });





var notebook = require('./controllers/blackboard');

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.use(express.static('public'));
app.use(expressValidator());

app.use(notebook);
app.use(express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "scripts")));



// app.get('/', function(req, res){
// res.redirect('/');
// });
