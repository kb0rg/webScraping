var Horseman = require('node-horseman')
var horseman = new Horseman();

horseman
    .open('southwest.com')
	.type('input[name="originAirport"]', 'SFO')
	.type('input[name="destinationAirport"]', 'MDW')
	.click("button#jb-booking-form-submit-button")
	.keyboardEvent("keypress",16777221)
	.waitForNextPage()
	.select('body.select-flights')
	.log() // prints out the number of results
	.close();