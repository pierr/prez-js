//## Global page actions
// Deal with the contene of the click on the navbar and display the page correctly.
(function() {
	var activeElement = document.location.hash.slice(1);
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
				$('div[data-ex="ajax"] .container').html(title);
			};

			xhr.onerror = function() {
				$('div[data-ex="ajax"] .container').html('Woops, there was an error making the request.');
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