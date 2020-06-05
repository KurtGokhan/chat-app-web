import express from 'express';
import socketio from 'socket.io';

const app = express();
const cwd = process.cwd();
const port = '4000';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static('build'));
app.get('*', function (req, res) {
  res.sendFile('build/index.html', { root: cwd });
});

const server = app.listen(parseInt(`${port}`), '0.0.0.0', function () {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log(`Message received: ${msg.message}`);
    socket.broadcast.emit('message', msg);
  });
});
