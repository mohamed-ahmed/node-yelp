
/*
 * GET home page.
 */


var yelp = require("../index").createClient({
  consumer_key: "_lcxOBpRig586ClN4MGfEw",
  consumer_secret: "nA3AKaOaPwdh1C10EDbWam_BeA8",
  token: "ljPYnmTKOv5rqyC7Bd3sSMF2p6EwStEL",
  token_secret: "7jVVs81exTyrxLVohdPkVyFD7s0",
  ssl: true
});


/*yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  console.log(error);
  console.log(data);
});

yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});*/



exports.index = function(req, res){
	console.log("req.cookies.key");
	console.log(req.cookies.key);
	res.render('index', { title: 'BigBlueButton HTML5 Client API Mate' });
};

exports.placesText = function(req, res, data){
	console.log(data);
	console.log("req.query: ");
	console.log(req.query);
	var searchLocation = req.query.address;
	console.log("got places request");
	yelp.search({term: "food", location: searchLocation }, function(error, data) {
		console.log(error);
		console.log(data);
		res.send(data);
		console.log("\ndone request");
	});
};

exports.placesCoords = function(req, res, data){
	console.log(data);
	console.log("req.query: ");
	console.log(req.query);
	var searchLocation = req.query.coords;
	console.log("got places request");
	yelp.search({term: "food", ll: searchLocation }, function(error, data) {
		console.log(error);
		console.log(data);
		res.send(data);
		console.log("\ndone request");
	});
};


