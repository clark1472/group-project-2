/* eslint-disable prettier/prettier */
// Dependencies
// =============================================================
// require("dotenv").config();
// var keys = require("../keys.js");
// var request = require("request");
// // var path = require("path");
var db = require("../models");
var axios = require("axios");

var googleMapsGeoKey = "AIzaSyAcWi7e4cYLA0SxYDy4qM4TI4itINyOIek";
var trailsKey = "200478741-5d75b3d8fc9d96ba1f9d4da1ddd5daf7";

var address = "85295";
var searchRadius = 100;
var searchLength = 10;
var latlngUrl =
  "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  address +
  "&key=" +
  googleMapsGeoKey;

var lat;
var lng;

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  //Render list of users on UserList handlebar page
  app.get("/api/users", function(req, res) {
    db.Hiker.findAll({}).then(function(dbHikers) {
      res.render("UserList", {
        msg: "Welcome!",
        examples: dbHikers
      });
    });  
   
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("/trails", function(req, res) {

    axios
      .get(latlngUrl)
      .then(function(response) {
      //var myresult = JSON.stringify(response.data.results[0].geometry, null,2);
 
        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
 
        var trailUrl =
        "https://www.hikingproject.com/data/get-trails?lat=" +
        lat +
        "&lon=" +
        lng +
        "&maxDistance=" +
        searchRadius +
        "&minLength=" +
        searchLength +
        "&key=" +
        trailsKey;
 
        axios.get(trailUrl).then(function(response) {
        // console.log(response.data.trails);
 
          var data = {};
          data = response.data.trails;
          //data.stringify = JSON.stringify(data);
          console.log(data);
          console.log("renderME");
          res.render("trails", {trails: data });
        });
 
      //console.log(response.data.results[0].geometry.location.lat);
      //console.log(response.data.results[0].geometry.location.lng);
      })
 
      .catch(function(error) {
      // handle error
        res.json(error);
      })
      .finally(function() {
      // always executed
      });
 
 
 
 
  });
 
  app.get("/", function(req, res) {
    res.render("index");
  });
 
  app.get("/userReg", function(req, res) {
    res.render("userReg");
  });
 
  // app.post("/trails", function(req, res) {
  //   res.render("trails");
  // });
 
  /*   app.get("/trails", function(req, res) {
    res.render("trails");
  }); */
 
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
<<<<<<< HEAD
};

// passport routes for htmlroutes for user authentication
var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticate.js");

module.exports = (app) => {
  app.get("/", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
    // change path to what ever is correct path amy created
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/members");
    }
        // change path to what ever is correct path amy created
    res.sendFile(path.join(__dirname, "../public/login.html"))
  });
}
=======
};
>>>>>>> 86c2337950becd50d79c9295a2078b29baaa44fb
