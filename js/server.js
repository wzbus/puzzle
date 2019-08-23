var app = require('http').createServer()
var io = require('socket.io')(app);

var PORT = 8080;
app.listen(PORT);

var socketMap = {};
var count = 0;

io.on('connection', function (socket) {
  count++;
  socket.clientNum = count;
  socket.nickname = 'user' + count;
  socketMap[count] = socket;

  if (count % 2 == 0) {
    socket.on('update', function (list) {
      socketMap[socket.clientNum - 1].emit('update', list);
    });
    socket.on('end', function (score) {
      socketMap[socket.clientNum - 1].emit('lost', score);
    });
  } else {
    socket.emit('waiting', 'waiting for another');
    socket.on('init', function (list) {
      socketMap[socket.clientNum + 1].emit('init', list);
    });
    socket.on('update', function (list) {
      socketMap[socket.clientNum + 1].emit('update', list);
    });
    socket.on('end', function (score) {
      socketMap[socket.clientNum + 1].emit('lost', score);
    });
  }

  io.emit('enter', socket.nickname + 'comes in');

  // socket.on('disconnect', function () {
  //   io.emit('leave', socket.nickname + 'left');
  // });
});

console.log("server run on" + PORT);