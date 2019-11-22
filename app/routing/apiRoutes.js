
// you don't have to name this since this entire export is the object itself?
var friends = require("../data/friends");

let matchName;
let matchPhoto;
let matchIndex;

module.exports = function (app) { 


app.get("/api/friendslist", function (req, res) {
    return res.json(friends);
});

app.get("/api/friends", function (req, res) {
    // THIS IS THE "DATA" YOU GET WITH AN AJAX CALL.  JUST NEED MATCH INDEX HERE TO SELECT ONE OF THE FRIENDS
    // DATA SHOULD BE RETURNED AS JSON SO YOU CAN JUST USE THIS LIKE AN API
    return res.json(friends[matchIndex]);
});

// let friends = [{
//     name: "George",
//     photo: "http://images6.fanpop.com/image/photos/37900000/-standing-up-random-man-37958716-200-300.jpg",
//     scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// },
// {
//     name: "Kil'Jaeden, the Deciever",
//     photo: "https://pbs.twimg.com/media/CuahpQSXEAAdYLP.jpg",
//     scores: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
// },
// {
//     name: "JaVale McGee",
//     photo: "https://usatwarriorswire.files.wordpress.com/2018/06/usatsi_10790701.jpg?w=1000&h=600&crop=1",
//     scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
// }]

// Create New 'People' - takes in JSON input
app.post("/api/friends", function (req, res) {

    var newPerson = req.body;

    console.log(newPerson);

    friends.push(newPerson);

    findMatch(newPerson);

    res.json(newPerson);
});

function findMatch(input) {
    let newPersonScoreArray = input.scores;

    let comparedArrays = [];

    let comparedArraySums = [];

    // FOR EACH FRIEND, MINUS ONE SINCE NEWEST ALREADY GETS APPENDED TO THE END AT THIS POINT... THIS WAY IT NEVER MATCHES YOU TO YOU
    for (let i = 0; i < friends.length - 1; i++) {
    // ..RUN THIS FOR LOOP WHICH MAKES A NEW ARRAY THAT TAKES THE DIFFERENCE OF EACH VALUE AT SCORE INDEX 
    // AND STORES IT AS A NEW INDEX IN THIS NEW ARRAY.  IT WORKS ON SAME FRIEND[i] IN ONE OF THIS FOR LOOP UNTIL DONE, THEN MOVE TO NEXT.
        for (let j = 0; j < 9; j++) {
            comparedArrays[i] = newPersonScoreArray.map(x => Math.abs(x - friends[i].scores[j]));
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

    matchIndex = comparedArraySums.indexOf(min);

    matchName = friends[matchIndex].name;
    matchPhoto = friends[matchIndex].photo;

    console.log("Your best match is " + matchName);
    console.log("Your match's photo is " + matchPhoto);
}

}