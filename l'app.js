const express = require('express');
const morgan = require('morgan');

const app = express();

//registe view engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');


app.listen(3000);

app.use((req, res, next) =>{ //app.get & app.use are both middleware, basically one of many cascading functions between the user's request and giving the user a response
    console.log("middleware running");
    next(); //allows the rest of the functions to carry on without giving a response.
})

app.use(express.static("public"));
app.use(morgan('dev'));

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