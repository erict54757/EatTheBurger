var express = require("express");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + 'public'));

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "eat_da_burger_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
 
//roots go here
app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) throw err;
   devoured= []
   notdevoured =[]
  for ( i= 0; i<data.length; i++) {
    if (data[i].devoured===1) {
        devoured.push(data[i])
    }
    if (data[i].devoured===0){
      notdevoured.push(data[i])}
      
  }
    res.render("index", { burger: notdevoured , devour: devoured });
    
    });
  });

  app.post("/", function(req, res) {
    // Test it
    // console.log('You sent, ' + req.body.task);
  
    // Test it
    // return res.send('You sent, ' + req.body.task);
  
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
      if (err) throw err;
  
      res.redirect("/");
    });
  });
  app.post("/devour", function(req, res) {
    // Test it
    // console.log('You sent, ' + req.body.task);
  console.log(req.body.key)  
    // Test it
    // return res.send('You sent, ' + req.body.task);
  
    connection.query("UPDATE burgers SET devoured=1 WHERE (id)=(?)", [req.body.key], function(err, result) {
    
     if (err) throw err;
 
      res.redirect("/");
    });
  });

  app.post("/delete", function(req, res) {
    // Test it
    // console.log('You sent, ' + req.body.task);

    // Test it
    // return res.send('You sent, ' + req.body.task);
  
    connection.query("DELETE FROM burgers  WHERE (id) >3", function(err, result) {
    
     if (err) throw err;
 
     
    });
    connection.query(" UPDATE burgers SET devoured=0 WHERE (id) <4", function(err, result) {
    
        if (err) throw err;
    
         res.redirect("/");
       });
  });












// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });