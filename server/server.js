var express = require('express'); //import the Express.js framework
var app = express();  //create an instance of the Express application
var sqlite3 = require('sqlite3'); //import the sqlite3 module
var cors = require("cors");

app.use(express.json());
app.use(cors());

// Initialize a connection to the database
var scheduleDB = new sqlite3.Database("./database/locations.db");

// Check if the database exists, if not it create a new one
scheduleDB.run("CREATE TABLE IF NOT EXISTS 'locations' (id INTEGER PRIMARY KEY, address TEXT, lat INTEGER, lng INTEGER)");

const locations = [
    "1080 W Beach St",
    "1426 Freedom Blvd",
    "1745 Walsh Ave",
    "9835 Newell Creek Rd",
    "4650 Meridian Ave",
    "4148 Monterey Rd",
    "6310 Chestnut St",
    "935 Terra Bella Ave",
    "150 E El Camino Real",
    "20620 Homestead Rd",
    "555 E Calaveras Blvd",
    "3970 Rivermark Plz",
    "1530 Hamilton Ave",
    "950 W Hamilton Ave",
    "6477 Almaden Expy",
    "2327 Mckee Rd",
    "1747 N 1St St",
    "775 Lincoln Ave",
    "10455 Miller Ave",
    "10309 Mary Avenue",
    "1032 N 10Th St",
    "11665 Berryessa Rd",
    "301 Carl Rd",
    "1303 Story Rd",
    "213 Dias Ln",
    "15292 Liberty St",
    "1565 Olivina Ave",
    "1845 W Winton Ave",
    "1015 N Amphlett Blvd",
    "39200 Paseo Padre Pkwy",
    "46 Fifth Ave",
    "523 S Shore Center W",
    "1312 Kirkham St",
    "810 Laurel St",
    "24601 Mission Blvd",
    "2680 Old First St",
    "1468 44Th Ave",
    "10790 Macarthur Blvd",
    "669 Gilman St",
    "33377 Western Ave",
    "735 7th Ave",
    "2350 Noriega St.",
    "15 Marina Blvd.",
    "690 Stanyan St.",
    "625 Monterey Blvd.",
    "1200 Irving St.",
    "850 La Playa St.",
    "1335 Webster St.",
    "375 32nd Ave.",
    "2020 Market St.",
    "730 Taraval St",
    "1245 S Van Ness Ave",
    "145 Jackson St",
    "4950 Mission St",
    "25 Point Lobos",
    "3350 Mission St",
    "6333 Geary Blvd.",
    "1765 California St",
    "99 Southgate Ave",
    "445V Bayshore Blvd",
    "345 Williams Ave"
]

for (var i=0; i<locations.length; i++){
    var coordinates = getCoordinates(locations[i]);

    var insertArray = [locations[i], coordinates[0], coordinates[1]];

    var insertQuery = "INSERT INTO schedule (address, lat, lng) VALUES (?), (?), (?))";

    scheduleDB.run(insertQuery, insertArray, function(err) {
        if (err) {
          return console.log(err.message);
        }
    });
}

function getCoordinates(location){

    return coordinates;
}

app.post('/find_location', function(req, res) {
    var address = req.body.addr;
    var lat1 = req.body.geocode.lat;
    var lng1 = req.body.geocode.lng;
    var closestLocations = [];
    
    scheduleDB.all("SELECT * FROM locations", function(err, rows) {  
    
        rows.forEach(function (row) {
          if (err) {
            return console.log(err.message);
          } 

          var lat2 = row.lat;
          var lng2 = row.lng;

          var dist = distance(lat1, lng1, lat2, lng2);

          if (dist < 10){
            closestLocations.push({"addr": row.address, "lat": lat2, "lng": lng2, "distance": dist});
          } 
        });        
    });


    console.log(address, lat, lng);
    res.send("test");
})

function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 0.8684;
		return dist;
	}
}

app.listen(3001);
