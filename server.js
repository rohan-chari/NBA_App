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

app.get("/", function(req,res){
    res.render("index",{playerList:playerList,yearList:yearList});
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})

app.post("/", function(req,res){
    playerList.push(req.body.playerSearch);
    yearList.push(req.body.yearSearch)
    res.redirect("/")
})
app.get("/reset",function(req,res){
    inputList = [];
    yearList = [];
    res.redirect("/");
})