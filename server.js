const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let playerList = [];
let yearList = [];
let playerObjectList = [];
let playerDataList = [];

app.get("/", function(req,res){
    res.render("index",{playerList:playerList,yearList:yearList,playerObjectList:playerObjectList});
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})

app.post("/", async function(req, res){
    const newPlayer = req.body.playerSearch;
    const newYear = req.body.yearSearch;
    
    playerList.push(newPlayer);
    yearList.push(newYear);

    async function getPlayerId(playerName) {
        const url = "https://www.balldontlie.io/api/v1/players?search=" + playerName;
        const response = await fetch(url);
        const jsonData = await response.json();
      
        // Check all returned players for exact name match
        for(let player of jsonData.data) {
            if (player.first_name + " " + player.last_name === playerName) {
                return player.id;
            }
        }
    
        // Return null or some error identifier if no match found
        return null;
    }
    

    const playerId = await getPlayerId(newPlayer);
    
    var IDurl = "https://www.balldontlie.io/api/v1/players/" + playerId;
    var IDresponse = await fetch(IDurl);
    var IDjsonData = await IDresponse.json();
    playerDataList.push(IDjsonData);

    var statsURL = "https://www.balldontlie.io/api/v1/season_averages?season=" + newYear + "&player_ids[]=" + playerId;
    var statsResponse = await fetch(statsURL);
    var statsJsonData = await statsResponse.json();
    
    playerObjectList.push(
        {
            "playerID": IDjsonData.id,
            "full_name": IDjsonData.first_name + " " + IDjsonData.last_name,
            "current_team": IDjsonData.team.full_name,
            "height": IDjsonData.height_feet + "'" + IDjsonData.height_inches, 
            "weight":IDjsonData.weight_pounds,
            "year_selected": String(newYear-1)+ "-"+newYear,
            "stats": statsJsonData.data
        }
    );
    res.redirect("/");
});

app.get("/reset",function(req,res){
    inputList = [];
    yearList = [];
    playerObjectList = [];
    playerDataList = [];
    res.redirect("/");
})