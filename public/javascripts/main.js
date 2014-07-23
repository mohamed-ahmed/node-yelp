//TODO just for testing - to be removed in 'production'

$(document).ready(function(){

	$("#submit-button").click(function(){
		var val = $("#search-box").val();
		if(val.length > 0){
			getTextResults(val);
		}
	});

	//getResults();
	function getLocation(callback, x) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function getCoordsResults(position) {

		var lcoationQuery = "" + position.coords.latitude + "," + position.coords.longitude;
		$.ajax({
			url : "/placesCoords?" + encodeURI("coords=" + lcoationQuery),
			success : onResultsResponse,
		});
	}

	getLocation(getCoordsResults);


});


function getTextResults(params){
	$.ajax({
		url : "/placesText?" + encodeURI("address=" + params),
		success : onResultsResponse,
	});
}

function onResultsResponse(data){
	$(".place").remove();
	console.log(data);
	data.businesses.forEach(function(elem){
		addPlaceToDom(elem);
	});

}

var count = 0;

function addPlaceToDom(place){

	var image_url
	if(place.image_url){
		image_url = place.image_url;
	}
	else{
		image_url = ("/images/restaurant.png");
	}

	var categories = "";
	place.categories.forEach(function(elem, index){
		categories += elem[0];
		if(index < place.categories.length - 1){
			categories += ", ";
		}
		else{
			categories += " ";
		}
	});

	var cal = ics();
	var subject = "Eat With Friends at " + place.name;
	var description = "Send this calendar entry to invite other friends or edit time and date";
	var location = place.location.address[0] + ", " + place.location.city;
	var begin = new Date((new Date()).getTime() + 60*60*1000);
	var end = new Date(begin.getTime()+60*60*1000);
	console.log(begin);
	console.log(end);
	cal.addEvent(subject, description, location, begin, end);

	console.log(cal);
	 

	var elem =
	dom("div", {class:"place row  count" + count%2, },
		dom("div", {class:"place-inner"},
			dom("div", {class : "place-text col-xs-4 col-sm-4 col-md-4"}, 
				dom("p", { class : "name-text" }, document.createTextNode(place.name)),
				dom("p", {class : "category-text"}, document.createTextNode(categories)),
				dom("p", {class : "distance-text"}, document.createTextNode( "" + (place.distance/1000).toFixed(2) + " km away" ))
			),
			dom("a", {class : "calendar-icon-wrapper col-xs-4 col-sm-4 col-nd-4"},
				dom("img", {class:"calendar-icon", src: "images/calendar_icon.png"})
			),
			dom("div", {class:"place-image-wrapper col-xs-4 col-sm-4 col-md-4"},
				dom("img", {class:"place-image pull-right", src : image_url})
			)

		)
	);


	$("#places-area").append(elem);

	$(elem).find(".calendar-icon").click(function(){
		cal.download();
	});

	count++;
}

