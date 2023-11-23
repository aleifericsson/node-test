const express = require("express");
const router = express.Router();
const Country = require('./models/countries');
const ObjectId = require('mongodb').ObjectId;

router.get('/add', (req, res) =>{
    res.render("add_country");
});

router.post('/add', (req, res) =>{
    console.log(req.body)
    flags_cols=req.body['flag-cols'].split(' ');
    vis = (req.body.visited === true);
    const country = new Country({
        name: req.body.name,
        flag_cols: flags_cols,
        visited: vis,
        rating: parseInt(req.body.rating)
    });

    country.save()
        .then((result)=>{res.redirect("/")})
        .catch((err)=>console.log(err));
});

//above /country/:countryID so that they know that "all" is not a countryID
router.get('/all', (req, res) => {
    Country.find() //returns list of everything, there is also findById() to use the unique id thingies.
        .then((result)=>{res.send(result)})
        .catch((err)=>console.log(err)); //result sorted by id (i think), you can use .sort to sort by createdAt time
})

router.get('/:countryID', (req, res) => {
    const id = req.params.countryID;
    //sample id: 6559e92e396ca6e0de0985c9
    Country.findById(new ObjectId(id))
        .then((result)=>{res.send(result);console.log(result)})
        .catch((err)=>console.log(err)); 
});

router.delete('/:countryID', (req, res) => {//to send the delete request, must be from frontend (but i too)
    const id = req.params.countryID;
    //sample id: 6559e92e396ca6e0de0985c9
    Country.findById(new ObjectId(id))
        .then((result)=>{res.json({redirect:"/"})}) //to send a json file back to frontend to redirect via frontend
        .catch((err)=>console.log(err)); 
});


module.exports = router;