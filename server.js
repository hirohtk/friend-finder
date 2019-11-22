var express = require("express");
var path = require("path");


var app = express();

// process.env.PORT if there is a port on process object that has an environment that has a PORT
// will use the process.env.PORT in deployed phase, otherwise use port 3000 in development phase
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
