// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
//var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables - 5 (DATA)
// =============================================================
var rTables = [];

 /* {
	  "reserved": "true",
"name": "micky",
"phone": "12121",
"email": "mickey@gmail.com",
"uniqueId": "12123"
},*/
    

// Routes
// 1) Home page link - home.html
// 2) View Tables link - tables
// 3) Make Reservation - reserve
// 4) Api Table Link - api/tables
// 5) Api Table Link - api/waitlist
// 6) Clear Button - 
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Basic route that sends the user first to the AJAX Page
app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});


// view tables link
app.get("/api/tables", function(req, res) {
 // res.sendFile(path.join(__dirname, "tables.html"));
 //for (var i = 0; i < rTables.length; i++) {
   // if (rTables[i].reserved === "false") {
      return res.json(rTables);
   // }
  
  //return res.json(false);
});

// Make Reservation link
app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Make Reservation link
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

/*
// Displays reserved tables
app.get("/tables", function(req, res) {
	  var chosen = req.params.rTables;

  console.log(chosen);

  for (var i = 0; i < rTables.length; i++) {
    if (rTables[i].reserved === "true") {
      return res.json(rTables[i]);
    }
  }
 // return res.json(rTables);
}); */

// Displays wait list tables
app.get("/api/waitList", function(req, res) {
  var chosen = req.params.rTables;

  console.log(chosen);

  for (var i = 0; i < rTables.length; i++) {
    if (rTables[i].reserved === "false") {
      return res.json(rTables[i]);
    }
  }

  return res.json(false);
});


// Displays a single character, or returns false
app.get("/api/reservations/:tables", function(req, res) {
  var chosen = req.params.rTables;

  console.log(chosen);

  for (var i = 0; i < rTables.length; i++) {
    if (chosen === rTables[i].status) {
      return res.json(rTables[i]);
    }
  }

  return res.json(false);
}); 

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //rTables.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  console.log("post at server side");
  console.log(newTable);

 
  
  rTables.push(newTable);
  
   for (var i = 0; i < rTables.length; i++) 
    {
      console.log(rTables[i]);
    }
  
  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
