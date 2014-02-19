/*Deal with the contene of the click on the navbar and display the page correctly.*/
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
	/*Select the active part.*/
	var selector = "div[data-ex='" + event.target.getAttribute('data-ex') + "']";
	document.querySelector(selector).hidden = false;
});