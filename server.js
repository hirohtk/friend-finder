var express = require("express");
var path = require("path");

var app = express();

// process.env.PORT if there is a port on process object that has an environment that has a PORT
// will use the process.env.PORT in deployed phase, otherwise use port 3000 in development phase
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Displays all people
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

var friends = [
    {
        name: "George",
        photo: "http://images6.fanpop.com/image/photos/37900000/-standing-up-random-man-37958716-200-300.jpg",
        scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
        name: "Kil'Jaeden, the Deciever",
        photo: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiAjOax8_LlAhVDrZ4KHaw1A1sQjRx6BAgBEAQ&url=https%3A%2F%2Fwowwiki.fandom.com%2Fwiki%2FKil%2527jaeden&psig=AOvVaw1zSwWXVO-x91A1El4AgnqX&ust=1574136985697436",
        scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    },
    {
        name: "Tyson Chandler",
        photo: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjpharv8vLlAhXJqZ4KHUgwBGUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.espn.com%2Fnba%2Fplayer%2F_%2Fid%2F984%2Ftyson-chandler&psig=AOvVaw2wh96knYpEqw5xQw1GYQ3v&ust=1574136845055366",
        scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    }
];

// Create New 'People' - takes in JSON input
app.post("/api/friends", function (req, res) {

    var newPerson = req.body;

    console.log(newPerson);

    friends.push(newPerson);

    findMatch(newPerson);

    res.json(newPerson);
});

function findMatch(input) {
    let newPersonArray = input.scores;

    let comparedArrays = [];

    let comparedArraySums = [];

    // FOR EACH FRIEND, MINUS ONE SINCE NEWEST ALREADY GETS APPENDED TO THE END AT THIS POINT...
    for (let i = 0; i < friends.length - 1; i++) {
    // ..RUN THIS FOR LOOP WHICH MAKES A NEW ARRAY THAT TAKES THE DIFFERENCE OF EACH VALUE AT SCORE INDEX 
    // AND STORES IT AS A NEW INDEX IN THIS NEW ARRAY.  IT WORKS ON SAME FRIEND[i] IN ONE OF THIS FOR LOOP UNTIL DONE, THEN MOVE TO NEXT.
        for (let j = 0; j < 9; j++) {
            comparedArrays[i] = newPersonArray.map(x => Math.abs(x - friends[i].scores[j]));
        }
    }
    console.log(comparedArrays);
    for (let k = 0; k < comparedArrays.length; k++) {
        let sum= 0;
        for (let l = 0; l < 9; l++) {
            sum += comparedArrays[k][l];
        }
        comparedArraySums.push(sum);
        // WHAT THIS SHOULD RETURN IS ONE VALUE IN ARRAYSUMS ARRAY FOR EACH PERSON 
    }
    console.log(comparedArraySums);

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
    const min = Math.min.apply(null, comparedArraySums);

    comparedArraySums.indexOf(min);
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
