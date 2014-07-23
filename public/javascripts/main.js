//TODO just for testing - to be removed in 'production'

$(document).ready(function(){

	$("#submit-button").click(function(){
		var val = $("#search-box").val();
		if(val.length > 0){
			getResults(val);
		}
	});

	//getResults();


});


function getResults(params){
	$.ajax({
		url : "/places?" + encodeURI("address=" + params),
		success : onResultsResponse,
	});
}

function onResultsResponse(data){
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
	var elem =
	dom("div", {class:"place row  count" + count%2, },
		dom("div", {class:"place-inner"},
			dom("div", {class : "place-text col-md-8"}, 
				dom("p", null, document.createTextNode(place.name)),
				dom("p", null, document.createTextNode(categories))
			),
			dom("div", {class:"place-image-wrapper col-md-4 "},
				dom("img", {class:"place-image pull-right", src : image_url })
			)

		)
	);


	$("#places-area").append(elem);

	count++;
}

