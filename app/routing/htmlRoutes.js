var path = require("path");

// you don't have to name this since this entire export is the object itself?

module.exports = function(app) {


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
})

};