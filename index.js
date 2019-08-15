const path = require('path');
const express = require('express');
var app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

http.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('playerEvent', function(data) {
    console.log(data);
    io.emit('playerEvent', data);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
