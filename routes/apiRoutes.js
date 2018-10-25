var db = require("../models");

module.exports = function(app) {



app.get("/", function(req, res) {
  db.Burger.findAll({where:{devoured:false}}).then(function(result){
    console.log(result[0])
    // res.json(result)
   
    db.Burger.findAll({where:{devoured:true}}).then(function(resulti){
      console.log(resulti[0])
      res.render("index", { burger: result, devour: resulti});
    }) 
  })

  });

  app.post("/", function(req, res) {
    db.Burger.create({burger:req.body.burger}).then(function(result){
     console.log(req.body.burger)
      res.redirect("/");
    })
  
  
      
  
  });
  app.post("/devour", function(req, res) {

  console.log(req.body.key)  
  db.Burger.update({devoured: true},{where: {id:req.body.key}}).then(function(result){
     res.redirect("/");
  })
    
     
  
  });

  app.post("/delete", function(req, res) {

    db.Burger.destroy({where: {id:{ $gt:2}}}).then(function(){
    db.Burger.update({devoured:false},{where: {id:{ $lt:3}}}).then(function(){

         res.redirect("/");
    })
  })
 
  });
}
