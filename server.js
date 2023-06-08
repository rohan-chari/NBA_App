const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.render("index");
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})
