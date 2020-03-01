const app = require("./backend/app");
const http = require("http");

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

const io = require('socket.io')(server);

let count = 0;

io.on('connection', (socket) => {
  count += 1;
  socket.emit('ClientID', socket.id);
  socket.emit('NumUsers', count);
  socket.broadcast.emit('fetchNumUsers');
  socket.emit('fetchNumUsers');

  socket.on('SendMsg', (data) => {

    const msg = {
      clientID: socket.id,
      content: data
    }
    socket.emit('Message', msg);
    socket.broadcast.emit('Message', msg);
  })
  socket.broadcast.emit('NumUsers', count);
  socket.on('disconnect', () => {
    count -= 1;
    socket.broadcast.emit('NumUsers', count)
    socket.broadcast.emit('fetchNumUsers')
  })
})

  app.use('/getTotalUsers', (req, res, next) => {
    return res.status(200).json(
      {
        totalUsers: count,
      }
    )
  })

server.listen(port);