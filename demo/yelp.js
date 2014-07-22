var yelp = require("../index").createClient({
  consumer_key: "_lcxOBpRig586ClN4MGfEw",
  consumer_secret: "nA3AKaOaPwdh1C10EDbWam_BeA8",
  token: "ljPYnmTKOv5rqyC7Bd3sSMF2p6EwStEL",
  token_secret: "7jVVs81exTyrxLVohdPkVyFD7s0",
  ssl: true
});


yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  console.log(error);
  console.log(data);
});

yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});

