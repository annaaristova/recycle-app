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

app.post('/find_location', function(req, res) {
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

          if (dist < 5){
            closestLocations.push({"addr": row.address, "lat": lat2, "lng": lng2, "distance": dist});
          } 
        }); 
         
        res.send( closestLocations );  
    });
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


/*
const locations = [
    "1080 West Beach Street, Watsonville, CA, USA",
    "1426 Freedom Blvd, Watsonville, CA, USA",
    "1745 Walsh Avenue, Santa Clara, CA, USA",
    "9835 Newell Creek Rd, Ben Lomond, CA, USA",
    "4650 Meridian Avenue, San Jose, CA, USA",
    "4148 Monterey Rd, San Jose, CA, USA",
    "6310 Chestnut Street, Gilroy, CA, USA",
    "935 Terra Bella Avenue, Mountain View, CA, USA",
    "150 East El Camino Real, Sunnyvale, CA, USA",
    "20620 Homestead Rd, Cupertino, CA, USA",
    "555 E Calaveras Blvd, Milpitas, CA, USA",
    "3970 Rivermark Plaza, Santa Clara, CA, USA",
    "1530 Hamilton Avenue, San Jose, CA, USA",
    "950 West Hamilton Avenue, Campbell, CA, USA",
    "6477 Almaden Expy, San Jose, CA, USA",
    "2327 McKee Rd, San Jose, CA, USA",
    "1747 North 1st Street, San Jose, CA, USA",
    "775 Lincoln Avenue, San Jose, CA, USA",
    "10455 Miller Avenue, Cupertino, CA, USA",
    "10309 Mary Avenue, Cupertino, CA, USA",
    "1032 North 10th Street, San Jose, CA, USA",
    "11665 Berryessa Rd, San Jose, CA, USA",
    "301 Carl Rd, Sunnyvale, CA, USA",
    "1303 Story Rd, San Jose, CA, USA",
    "213 Dias Ln, Watsonville, CA, USA",
    "15292 Liberty Street, San Leandro, CA, USA",
    "1565 Olivina Avenue, Livermore, CA, USA",
    "1845 West Winton Avenue, Hayward, CA, USA",
    "1015 N Amphlett Blvd, San Mateo, CA, USA",
    "39200 Paseo Padre Pkwy, Fremont, CA, USA",
    "46 Fifth Avenue, Redwood City, CA, USA",
    "523 South Shore Center West, Alameda, CA, USA",
    "1312 Kirkham Street, Oakland, CA, USA",
    "810 Laurel Street, San Carlos, CA, USA",
    "24601 Mission Blvd, Hayward, CA, USA",
    "2680 Old First Street, Livermore, CA, USA",
    "1468 44th Avenue, Oakland, CA, USA",
    "10790 MacArthur Blvd, Oakland, CA, USA",
    "669 Gilman Street, Berkeley, CA, USA",
    "33377 Western Avenue, Union City, CA, USA",
    "735 7th Avenue, San Francisco, CA, USA",
    "2350 Noriega Street, San Francisco, CA, USA",
    "15 Marina Blvd, San Francisco, CA, USA",
    "690 Stanyan Street, San Francisco, CA, USA.",
    "625 Monterey Blvd, San Francisco, CA, USA.",
    "1200 Irving Street, San Francisco, CA, USA.",
    "850 La Playa Street, San Francisco, CA, USA",
    "1335 Webster St, San Francisco, CA, USA",
    "375 32nd Avenue, San Francisco, CA, USA.",
    "2020 Market Street, San Francisco, CA, USA.",
    "730 Taraval Street, San Francisco, CA, USA",
    "1245 South Van Ness Avenue, San Francisco, CA, USA",
    "145 Jackson Street, San Francisco, CA, USA",
    "4950 Mission Street, San Francisco, CA, USA",
    "25 Point Lobos Avenue, San Francisco, CA, USA",
    "3350 Mission Street, San Francisco, CA, USA",
    "6333 Geary Blvd, San Francisco, CA, USA",
    "1765 California Street, San Francisco, CA, USA",
    "99 Southgate Avenue, Daly City, CA, USA",
    "445v Bayshore Blvd, San Francisco, CA, USA",
    "345 Williams Avenue, San Francisco, CA, USA"
]

for (var i=0; i<locations.length; i++){
    getCoordinates(locations[i]);
}

function getCoordinates(location){
    var insertQuery = "INSERT INTO locations (address, lat, lng) VALUES (?, ?, ?)";
    var API_KEY = "AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q";
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key="+API_KEY).then(function (response) {
        // handle success
        var {lat, lng} = response.data.results[0].geometry.location;
        var lat = {lat, lng}.lat;
        var lng = {lat, lng}.lng;

        var insertArray = [location, lat, lng];

        scheduleDB.run(insertQuery, insertArray, function(err) {
            if (err) {
              return console.log(err.message);
            }
        });

        console.log(insertArray);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}
*/