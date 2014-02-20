# Promise
--
## Callback problem
- Answer to the callback problem which are difficult to manage when the workflow is complex.
- If an **exception** occurs, the **thread** is **broken**.
- A callback must be **register before** its **called**.
- A callback can be trigger **multiple** times. 
--

## State
- **Pending**: don't get a result.
- **Fullfilled**: unable to get a result.
- **Rejected**: a problem occurs.
- **Setteled**: fullfilled  or rejected
--

## How it works
- Must be followed by a `then(onFullFilled, [,onRejected])`
- Each argument is optional and must be a function
- Only one will be called, **once**
- The call is **asynchronous**
--
## The code
```:javascript
var promise = new Promise(function(resolve, reject) {
	  //Do something maybe asynchronous or not
	  var isOk = treatement();
	  if (isOk) {
	    resolve("It works...");
	  } else {
	    reject(Error("It does not work!"))
}).then(console.log, console.error);
```
--
## More
- [JQuery deffered](http://api.jquery.com/category/deferred-object/) is not a promise A+
- [q](https://github.com/kriskowal/q) does not implement promise A+
- [SPEC](http://promises-aplus.github.io/promises-spec/)
- [Bluebird](https://github.com/petkaantonov/bluebird)