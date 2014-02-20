//## This file contains a web worker. It is in an external file by default.
self.addEventListener('message', function(e) {
	var data = e.data;
	switch (data.cmd) {
		case 'start':
			self.postMessage('WORKER STARTED: ' + data.msg);
			break;
		case 'stop':
			self.postMessage('WORKER STOPPED: ' + data.msg +
				'. (buttons will no longer work)');
			self.close(); // Terminates the worker.
			break;
		default:
			self.postMessage('Unknown command: ' + data.msg);
	};
}, false);