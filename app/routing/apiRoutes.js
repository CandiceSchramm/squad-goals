var path = require("path");
var users = require("../data/friends.js");


module.exports = function(app) {
/////////////WHEN CLIENT VIEWS THE API, THE SERVER SENDS BACK THE USERS API IN JSON FORMAT
    app.get("/api/friends", function(req, res) {
        res.json(users);
    })

/////////////WHEN CLIENT CLICKS THE RESET ALL USERS BUTTON, THIS WILL CLEAR THE USER API 
app.post("/api/clear", function() {
    // Empty out the array of data
    users = [];

    console.log(users);
  });

/////////////WHEN CLIENT COMPLETES THE SURVEY, THE SERVER SENDS THE BEST MATCH BACK TO CLIENT VIA RESPONSE
    app.post("/api/friends", function(req,response){
        console.log("this is a post");


        //save the current user's scores & add them together
        var userScores = req.body.scores;
        var userScoreSum = 0;
        for (t = 0; t<userScores.length; t++) {
            userScoreSum += parseInt(userScores[t]);
        }
        console.log("the current users score is " + userScoreSum);



        //post the current user to the users
        users.push(req.body);



        //make a placeholder for all the friends scores added up
        var sumArray = [];
        //loop through friends and add up their scores
        for (i = 0; i< users.length-1; i ++){
            //while in each friend, we need to add up thier score
            var scoreArray = users[i].scores;
            var sum = 0;
            for (j = 0; j<scoreArray.length; j++){
                sum += parseInt(scoreArray[j]);
            }
            //push their score to the sumArray so we can keep track of them
            sumArray.push(sum);
            console.log(sumArray);
        }
        

        //get the difference in scores between current user and the other users & store them in an array
        var differences = []
        for (m = 0; m <sumArray.length; m++){
            var diff = userScoreSum - sumArray[m];
            differences.push(Math.abs(diff));
        }
        console.log("the differences in scores are: " + differences);
        //now we know the differences we need to know which is the smallest difference
        //Math.min finds the smallest number listed in the differences array
        var bestMatch = (Math.min(...differences));

        //now we need to loop back throught the differences array to get the index of the best match
        for (p = 0; p<differences.length; p++){
            if (differences[p] == bestMatch){
                console.log("the index of the best match is: " + p);
                 response.json(users[p]);

            }
        }



    
    });
};