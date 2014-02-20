//## This file contains a web worker. It is in an external file by default.
self.addEventListener('message', function(e) {
	var data = e.data;
	//Switch on  the message we receive.
	switch (data.cmd) {
		//The worket begin to work.
		case 'start':
			self.postMessage('WORKER STARTED: ' + data.msg);
			break;
		case 'nimp':
			self.postMessage('WORKER NIMP: ' + data.msg);
			break;
			//Stop the worker.
		case 'stop':
			self.postMessage('WORKER STOPPED: ' + data.msg +
				'. (buttons will no longer work)');
			self.close(); // Terminates the worker.
			break;
			//I cannot treat your demand.
		default:
			self.postMessage('Unknown command: ' + data.msg);
	}
}, false);