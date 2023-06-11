const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let inputList = [];
let playerObjectList = [];

app.get("/", function(req,res){
    res.render("index",{inputList:inputList});
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})

app.post("/", function(req,res){
    inputList.push(req.body.playerSearch);
    res.redirect("/")
})