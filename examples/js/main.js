//## Global page actions
// Deal with the contene of the click on the navbar and display the page correctly.
(function() {
	var activeElement = document.location.hash.slice(1);
	activeElement = activeElement || "home";
	var selector = "[data-ex='" + activeElement + "']";
	document.querySelector("a" + selector).parentNode.classList.add('active');
	document.querySelector("div" + selector).hidden = false;
})();
$('.navbar a[data-ex]').on('click', function(event) {
	event.preventDefault();
	//Remove the  active class;
	document.querySelector('.navbar li.active').classList.remove('active');
	//Set the new active class.
	event.target.parentNode.classList.add('active');
	//Hide all the element //Todo: simplify.
	Array.prototype.forEach.call(document.querySelectorAll("div[data-ex]"), function(elt) {
		elt.hidden = true;
	});

	//Select the active part.
	var selector = "div[data-ex='" + event.target.getAttribute('data-ex') + "']";
	document.querySelector(selector).hidden = false;

	//Update the location url hash
	document.location.hash = "#" + event.target.getAttribute('data-ex');
});


// # Demo code.

//Global name space.
Demo = {};

// ## AJAX
(function(NS) {
	NS = NS || {};
	var ajax = function(method, url) {
		// Create the XHR object.
		function createCORSRequest(method, url) {
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr) {
				// XHR for Chrome/Firefox/Opera/Safari.
				xhr.open(method, url, true);
			} else if (typeof XDomainRequest != "undefined") {
				// XDomainRequest for IE.
				xhr = new XDomainRequest();
				xhr.open(method, url);
			} else {
				// CORS not supported.
				xhr = null;
			}
			return xhr;
		}

		// Helper method to parse the title tag from the response.
		function getTitle(text) {
			return text.match('<title>(.*)?</title>')[1];
		}

		// Make the actual CORS request.
		function makeCorsRequest(method, url) {
			// All HTML5 Rocks properties support CORS.
			var xhr = createCORSRequest(method, url);
			if (!xhr) {
				alert('CORS not supported');
				return;
			}

			// Response handlers.
			xhr.onload = function() {
				var text = xhr.responseText;
				var title = getTitle(text);
				$('div[data-ex="ajax"] .container').html("<div class='alert alert-success alert-dismissable'>" + title + "</div>");
			};



			xhr.onerror = function() {
				$('div[data-ex="ajax"] .container').html("<div class='alert alert-danger alert-dismissable'>" + 'Woops, there was an error making the request.' + "</div>");
			};

			xhr.send();
		}
		makeCorsRequest(method, url);
	};
	NS.ajax = ajax;
	return ajax;
})(Demo);
//Register the button ajax on the demo page.
$('button#ajax').on('click', function(event) {
	Demo.ajax('GET', 'http://updates.html5rocks.com');
});


// ## WebSocket
(function(NS) {
	NS = NS || {};
	var ws = {};
	ws.connect = function(url) {
		//Connect to the web socket
		NS.socket = io.connect(url);
		//When the connection is up, the new event is emit from the server.
		NS.socket.on('news', function(data) {
			console.log(data);
			//Emit a message to the server.
			NS.socket.emit('demo-client', {
				my: 'ws-connect'
			});
			//Display the connection status.
			$('div[data-ex="websocket"] .container').html('<div class="alert alert-success alert-dismissable">Connected</div>');
		});

	};
	ws.emit = function(data) {
		//On each click emit a message to the server which is acknowleging the result.
		NS.socket.emit('demo-client', data, function cb(date) {
			//Display the response.
			$('div[data-ex="websocket"] .container').append('<div class="alert alert-success alert-dismissable">The server respond at: <b>' + date + "</b></div>");
		});
		//Display the emit.
		$('div[data-ex="websocket"] .container').append('<div class="alert alert-info alert-dismissable">Event emit: <b>' + new Date().toJSON() + "</b> </div>");
	};
	NS.ws = ws;
	return ws;
})(Demo);
$('button#ws-connect').on('click', function(event) {
	Demo.ws.connect('http://localhost:8888');
});
$('button#ws-click').on('click', function(event) {
	Demo.ws.emit({
		papa: "singe"
	});
});

//## Webworker
(function(NS) {
	NS = NS || {};
	var ww = {};
	//This will display the message into the container.
	function log(msg) {
		$('div[data-ex="webworkers"] .container').html("<div class='alert alert-info alert-dismissable'>" + msg + "</div>");
	}
	//Start the worker
	ww.start = function(scriptPath) {
		if (NS.worker) {
			ww.stop();
		}
		NS.worker = new Worker(scriptPath);
		NS.worker.addEventListener('message', function(e) {
			log(e.data);
		}, false);
		log('Worker is connected');
	};
	//Stop the web worker.
	ww.stop = function() {
		if (NS.worker) {
			NS.worker.removeEventListener('message');
			ww.send("stop", "Stop worker.");
		}
	};
	//Send a message to the web worker, with the followind contract: `{cmd: "commandName", data: {...}}`
	ww.send = function(cmd, data) {
		if (!NS.worker) {
			log('You have to start the worker first');
		}
		//Use the post message interface.
		NS.worker.postMessage({
			cmd: cmd,
			msg: data
		});
	};
	NS.ww = ww;
	return ww;
})(Demo);
//Register button handlers.
$('button#ww-start').on("click", function() {
	Demo.ww.start('./js/worker.js');
});
$('button#ww-stop').on("click", function() {
	Demo.ww.send("stop", "Stop worker.");
});
$('button#ww-stop-force').on("click", function() {
	Demo.ww.stop();
});
$('button#ww-nimp').on("click", function() {
	Demo.ww.send("nimp", "This is really nimp");
});
$('button#ww-unknown').on("click", function() {
	Demo.ww.send("UNKNOWN", "This should be UNKNOWN...");
});


//## Geolocation
(function(NS) {
	NS = NS || {};
	var geo = {};
	//This will display the message into the container.
	function log(msg, type) {
		type = type || 'info';
		$('div[data-ex="geolocation"] .container').html("<div class='alert alert-" + type + " alert-dismissable'>" + msg + "</div>");
	}

	function locateSuccess(lat, long) {
		log('Geolocation success: <ul><li>lat: <b>' + lat + '</b> </li><li>long: <b>' + long + '</b></li></ul>', "success");
	}

	function locateError(error) {
		console.error(error);
		log('Geolocation error: <ul><li>code: <b>' + error.code + '</b> </li><li>message: <b>' + error.message + '</b></li></ul>', 'danger');
	}
	//Ask for the location of the user.
	geo.locate = function() {

		navigator.geolocation.getCurrentPosition(function(position) {
			locateSuccess(position.coords.latitude, position.coords.longitude);
		}, locateError);
		log('Localisation requested ... Please wait', "info");
	};
	geo.track = function() {
		if(NS.geo.watchId){geo.stop();}
		//Save the watch id in order to be able to stop it.
		NS.geo.watchId = navigator.geolocation
			.watchPosition(
				function(position) {
					locateSuccess(position.coords.latitude, position.coords.longitude);
				},
				locateError, {
					enableHighAccuracy: true, //Best result as possible.
					maximumAge: 30000, // Time during which a cached position is acceptable.
					timeout: 27000 //time in milisecond for tracking acceptance on the response before an error.
				});
	};
	geo.stop = function(){
		if(!NS.geo.watchId){
			log('You are not tracked ... Why so paranoid !', 'info');
			return;
		}
		navigator.geolocation.clearWatch(NS.geo.watchId);
		NS.geo.watchId = undefined;
		log('End of watch ... Ouf!', 'info');
	};

	NS.geo = geo;
	return geo;
})(Demo);
//Register button handlers.
$('button#locate').on("click", function() {
	Demo.geo.locate();
});
$('button#track').on("click", function() {
	Demo.geo.track();
});

$('button#stop-track').on("click", function() {
	Demo.geo.stop();
});