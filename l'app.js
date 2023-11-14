const express = require('express');

const app = express();
app.listen(3000);

//registe view engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');

const fs = require('fs');
let chars;
fs.readFile("chars.json", (err, data) =>{
    if (err) throw err;
    chars = JSON.parse(data);
})

app.get("/", (req,res) => {
    res.render("index", {count2: 0}); 
})
app.get("/404", (req,res) => {
    res.render("404",{chars}); //chars is shorthand for saying chars:chars
})
app.get("/hidden", (req,res) =>{
    res.redirect("/");
})
app.use((req, res) =>{ //express is cascading, so use this function for every request that is not any of the above.
    res.status(404).render("404");
})