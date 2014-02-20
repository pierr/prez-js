var io = require('socket.io').listen(8888);

//Register the connection.
io.sockets.on('connection', function(socket) {
	socket.emit('news', {
		hello: 'world'
	});

	socket.on('demo-client', function(data, fn) {
		var jsonDate = new Date().toJSON();
		console.log("The client called me at " + jsonDate, data);
		if (fn !== undefined) {
			fn(jsonDate);
		}
	});
});