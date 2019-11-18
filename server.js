var express = require("express");
var path = require("path");

var app = express();

// process.env.PORT if there is a port on process object that has an environment that has a PORT
// will use the process.env.PORT in deployed phase, otherwise use port 3000 in development phase
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
  });
  
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
  });

  // Displays all people
  app.get("/api/friends", function (req, res) {
      return res.json(friends);
  });
  
  var friends = [
    {
      name: "deep man",
      photo: "images/sea-pig-hand-mouth-random-man-37958727-480-360.jpg",
      scores: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10]
    },
  ];

  // Create New 'People' - takes in JSON input
app.post("/api/friends", function(req, res) {

    var newPerson = req.body;

    console.log(newPerson);
  
    friends.push(newPerson);
  
    res.json(newPerson);
});
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  