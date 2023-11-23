const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Country = require('./models/countries');
const thing = require('./app.js');
const thing2 = require('./server.js');
const countryRoads = require('./countryRoads');

const app = express();
const dbURI = `mongodb+srv://whisperSSG${thing2}:${thing}@cluster0.k9znbbq.mongodb.net/database0?retryWrites=true&w=majority`;
mongoose.connect(dbURI)
    .then((result)=>console.log('connected'))
    .catch((err)=>console.log(err));

//registe view engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');


app.listen(3000);

app.use((req, res, next) =>{ //app.get & app.use are both middleware, basically one of many cascading functions between the user's request and giving the user a response
    console.log("middleware running");
    next(); //allows the rest of the functions to carry on without giving a response.
})

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.get('/test-add', (req, res) =>{
    const country = new Country({
        name: "Indonesia",
        flag_cols: ["Red", "White"],
        visited: true,
        rating: 6
    });

    country.save()
        .then((result)=>{res.send(result)})
        .catch((err)=>console.log(err));
});

app.use("/country", countryRoads)

const fs = require('fs');
const { ObjectId } = require('mongodb');
let chars;
fs.readFile("chars.json", (err, data) =>{
    if (err) throw err;
    chars = JSON.parse(data);
})

app.get("/", (req,res) => { 
    res.render("index", {count2: 1}); 
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