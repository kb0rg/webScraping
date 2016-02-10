var rp = require('request-promise');
var cheerio = require('cheerio');

var car = "jeep"

var createCraigURL = function(car){
  return 'http://sfbay.craigslist.org/search/cta?is_paid=all&search_distance_type=mi&query=' + car;
}

var carURL = createCraigURL('mercedes');

// from request-promise repo
var options = {
    uri: carURL,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
.then(function($){

  var cars = $('p.row');
  // cheerio returns an array-like object, not actually an array
  // can use for loop but not .each() or forEach()

  for (var i = 0; i<cars.length; i ++) {
  	var titleOfThisCar = cheerio(cars[i]).find('a.hdrlnk').text()
  	console.log("TITLE", titleOfThisCar);

  	var priceOfThisCar = cheerio(cars[i]).find('span.l2').find('span.price').text();

  	if (priceOfThisCar.length === 0) {
  		console.log("PRICE: Not supplied\n");
  	} else {
  	console.log("PRICE", priceOfThisCar + "\n");
  	}
  }


  //var titleOfOneCar = cheerio(cars[0]).find('a.hdrlnk').text()
  //console.log(titleOfOneCar);
})