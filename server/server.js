var express = require('express'); //import the Express.js framework
var app = express();  //create an instance of the Express application
var sqlite3 = require('sqlite3'); //import the sqlite3 module
var cors = require("cors");
var distance = require('google-distance-matrix');
var Promise = require('promise');

app.use(express.json());
app.use(cors());

// Initialize a connection to the database
var scheduleDB = new sqlite3.Database("./database/locations.db");

// Check if the database exists, if not it create a new one
scheduleDB.run("CREATE TABLE IF NOT EXISTS 'locations' (id INTEGER PRIMARY KEY, address TEXT, lat INTEGER, lng INTEGER)");

function calculateDistance(origin, destination) {
  return new Promise((resolve, reject) => {
    distance.key('AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q'); 
    distance.units('imperial');

    distance.matrix(origin, destination, (err, distances) => {
      if (err) {
        reject(err);
      } else if (!distances) {
        reject('No distances');
      } else if (distances.status === 'OK') {
        var dist = distances.rows[0].elements[0].distance.text;
        var numericDist = parseFloat(dist.replace(' mi', ''));
        var time = distances.rows[0].elements[0].duration.text;
        var distAndTime = [numericDist, time];
        resolve(distAndTime);
      }
    });
  });
}

app.post('/find_location', (req, res) => {
    var lat1 = req.body.geocode.lat;
    var lng1 = req.body.geocode.lng;
    var addr = req.body.addr;
    var origin = [addr, lat1 + ',-' + lng1];
    var closestLocation = [];

    scheduleDB.all("SELECT * FROM locations", async (err, rows) => {  
      if (err) {
        return console.log(err.message);
      } 

      closestLocation = await Promise.all(
        rows.map(async (row) => {
          var lat2 = row.lat;
          var lng2 = row.lng;
          var crvAddr = row.address
          var destination = [crvAddr, lat2 + ',-' + lng2]

          var distAndTime = await calculateDistance(origin, destination);

          if (distAndTime[0] < 5) {
            return { addr: row.address, lat: lat2, lng: lng2, distance: distAndTime[0], time: distAndTime[1] };
          } 
          else {
            return null;
          }
        })
      )
      var filteredLocations = closestLocation.filter(Boolean);
      res.send( filteredLocations );
    });
  })

app.listen(3001);


