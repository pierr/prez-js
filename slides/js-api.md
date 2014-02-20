# JS api
--
# Web workers (1/2)
- **Background** scripts inside the application
- Run in a **isaolated thread**

```:javascript
//Create the Worker from a separate file
var worker = new Worker('doWork.js');
//Listen to the ww messages
worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);
// Send data to our worker and start it.
worker.postMessage('Worker, it's time to run.); 
```
--
# Web workers (2/2)
## What can they do
- __Access__ **navigator**, **location**, **xhr**, **appcache**, **other worker**, **external scripts** with `importScripts()`
- __No Access__ **DOM**, **window**, **document**, **parent**
- [Example](../examples/index.html#webworkers
)

- [html5rocks](http://www.html5rocks.com/en/tutorials/workers/basics/)

--
# Geolocation (1/3)
- Ability to get from a device its **position**
- It is an _asynchronous_ operation, a **callback** must be written
- It could be unavailable on the device.
- [MDN](https://developer.mozilla.org/fr/docs/Using_geolocation)
- [Example](../examples/index.html#geolocation)
--
## Geolocation current position (2/3)
```:javascript
navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
```
- You can get the **current** position
--
## Geolocation  watch position(3/3)
```:javascript
var watchID = navigator.geolocation
					   .watchPosition(
						 geo_success, 
						 geo_error, 
						 {
						   enableHighAccuracy:true, 
						   maximumAge:30000, 
						   timeout:27000
					    });
```
- You can watch the user position, a callback is called each time the position change.
- The watch can be cancelled with `navigator.geolocation.clearWatch(watchID);`
--

# File API (1/2)

```:html
  <input type="file" id="input" multiple/>
```

- Add a multiple options
- File can be accessed with JavaScript

--
# File API (2/2)
````:JavaScript
var inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files;
}
```
- [MDN](https://developer.mozilla.org/fr/docs/Using_files_from_web_applications)
- [Example](../examples/index.html#fileapi)
--
# Offline (1/3)
- application cache
- DOM storage
- 