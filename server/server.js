var express = require('express'); //import the Express.js framework
var app = express();  //create an instance of the Express application
var sqlite3 = require('sqlite3'); //import the sqlite3 module
var cors = require("cors");
var distance = require('google-distance-matrix');

app.use(express.json());
app.use(cors());

// Initialize a connection to the database
var scheduleDB = new sqlite3.Database("./database/locations.db");

// Check if the database exists, if not it create a new one
scheduleDB.run("CREATE TABLE IF NOT EXISTS 'locations' (id INTEGER PRIMARY KEY, address TEXT, lat INTEGER, lng INTEGER)");

app.post('/find_location', function(req, res) {
    var lat1 = req.body.geocode.lat;
    var lng1 = req.body.geocode.lng;
    var addr = req.body.addr;
    var origin = [addr, lat1 + ',-' + lng1]
    var closestLocations = [];
    
    scheduleDB.all("SELECT * FROM locations", function(err, rows) {  
    
        rows.forEach(function (row) {
          if (err) {
            return console.log(err.message);
          } 

          var lat2 = row.lat;
          var lng2 = row.lng;
          var crvAddr = row.address
          var destination = [crvAddr, lat2 + ',-' + lng2]

          calculateDistance(origin, destination, function (err, dist) {

            if (err) {
              console.log(err);
            } else {
              var distValue = parseFloat(dist.replace(" mi", ""));
              if (distValue < 5) {
                closestLocations.push({"addr": row.address, "lat": lat2, "lng": lng2, "distance": distValue});
              }
            }
          });
          console.log(closestLocations)

        }); 
    });
})

function calculateDistance(origin, destination, callback){
  var dist;
  var time;

  distance.key("AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q");
  distance.units('imperial');

  distance.matrix(origin, destination, function (err, distances) {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    if(!distances) {
      console.log('no distances');
      callback('No distances', null);
    }
    if (distances.status == 'OK') {
      dist = distances.rows[0].elements[0].distance.text;
      callback(null, dist);
    }
  });
}

app.listen(3001);
