const http = require('http');
const fs = require('fs');
const { handleError,handleErrorRes } = require('./handleError');

const server = http.createServer((request,response) => {//callback function runs every time a request happens. request = data on url, type, response = send to browser.
    console.log("request made from " +request.url); //note: this message does not show up in devtools because that is frontend, this is backend.

    if (request.url == "/uhuh"){
        response.setHeader("Content-Type", "text/html");
        fs.readFile('./index.html',(err,data)=>{
            if (!handleErrorRes(err)){   
            response.write(data);
            response.statusCode = 200;
            response.end()
            }
        })
    }
    else if (request.url == "/hidden"){
        response.statusCode = 301;
        response.setHeader("Location", "/404");
        response.end(); 
    }
    else if (request.url == "/404"){
        response.setHeader("Content-Type", "text/html");
        fs.readFile('./404.html',(err,data)=>{
            if (!handleErrorRes(err)){   
            response.write(data);
            response.statusCode = 404;
            response.end()
            }
        })
    }
    else{
        response.setHeader("Content-Type", "text/plain");
        response.write("rock");
        response.statusCode = 200;
        response.end();
    }
});

server.listen(3000, 'localhost', () =>{ //localhost is 127.0.0.1, which loops back to the computer, local host is the 'door/channel' inside localhost
    console.log("listening to requests in this portnumber and host")
});

//the path: http://127.0.0.1:3000/ or localhost:3000

const thing2 = `${Math.floor(Math.PI)+Math.sqrt(Math.sqrt(256))+1}`

module.exports = thing2;