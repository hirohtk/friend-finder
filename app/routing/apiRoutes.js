let personList = [];

// Displays all characters
   app.get("/api/friends", function(req, res) {
    return res.json(characters);
  });

  app.post("/api/friends"), function (req, res) {
    var newPerson = req.body;
    // that stuff is needed so that the new character name is one word 
    //newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newPerson);
  
    personList.push(newPerson);
  
    res.json(newPerson);
  }