var path = require("path");


module.exports = function(app) {
app.get("/", function(req, res) {
  console.log("this will load the homepage")
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

//survey page
app.get("/survey", function(req, res) {
  console.log("this will load the survey page");
    res.sendFile(path.join(__dirname, "../survey.html"));
  });
}

  