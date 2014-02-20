# Communication
--
## XMLHttpRequest
```:JavaScript
var req = new XMLHttpRequest();
req.open('GET', 'http://www.mozilla.org/', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200)
      dump(req.responseText);
     else
      dump("Erreur pendant le chargement de la page.\n");
  }
};
req.send(null);	
```
- [MDN](https://developer.mozilla.org/fr/docs/XMLHttpRequest)
- [Example](../examples/index.html#ajax)
--
## WebSockets (1/3)
- Open a communication between the client and the server.
- The data exchange is not done with http => **WS protocol** => No header
- WS can be use to have clients talking to clients
- [Example](../examples/index.html#websocket)
- [MDN](https://developer.mozilla.org/fr/docs/WebSockets)
- [socket.io](http://socket.io/)
--
## WebSockets  server  (2/3)
```:JavaScript
//Server
var io = require('socket.io').listen(80);
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
```
--
## WebSockets  client (3/3)
```:JavaScript
//Client
 var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
```