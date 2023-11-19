/*

const express = require('express');

const app = express();
app.listen(3000);

app.get("/", (req,res) => {
    res.sendFile("./index.html", {root:__dirname});
})
app.get("/404", (req,res) => {
    res.sendFile("./404.html", {root:__dirname});
})
app.get("/hidden", (req,res) =>{
    res.redirect("/");
})
app.use((req, res) =>{ //express is cascading, so use this function for every request that is not any of the above.
    res.status(404).sendFile("./404.html", {root:__dirname});
})

*/

const num = (11*13)-20

const thing = `Qwe${num}`

module.exports = thing;