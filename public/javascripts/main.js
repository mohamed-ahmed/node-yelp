//TODO just for testing - to be removed in 'production'

$(document).ready(function(){


	getResults();


});


function getResults(){
	$.ajax({
		url : "places",
		success : onResultsResponse
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
	var elem =
	dom("div", {class:"place row count" + count%2, },
		dom("div", {class:"place-inner"},
			dom("p", {class : "col-md-8"}, document.createTextNode(place.name)),
			dom("div", {class:"place-image-wrapper col-md-4 pull-right"},
				dom("img", {class:"place-image", src : place.image_url })
			)

		)
	);


	$("#places-area").append(elem);

	count++;
}

