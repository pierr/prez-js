var io = require('socket.io').listen(8888);

//Register the connection.
io.sockets.on('connection', function(socket) {
	//Emit en event in order to say that the connection is active to the clients.
	socket.emit('news', {
		hello: 'world'
	});

	//Listen to the events from tje client and acknolgge it.
	socket.on('demo-client', function(data, fn) {
		var jsonDate = new Date().toJSON();
		console.log("The client called me at " + jsonDate, data);
		if (fn !== undefined) {
			//Callback the emitter with any data you want to pass.
			fn(jsonDate);
		}
	});
});