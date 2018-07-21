var path = require("path");
var users = require("../data/friends.js");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(users)
    })
    app.get("/api/friends/", function(req, res){
        console.log("this is a request");
    });
    
    app.post("/api/friends", function(res,res){
        console.log("this is a post")
    });
}