#!/usr/bin/env node

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {//async method, that's why dirname shows first
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

console.log(__dirname);
console.log(__filename);

const os = require('os');
console.log(os.platform());

const fs = require('fs');

/*
fs.readFile("text.txt", (err,data) => {//also async method
  if(err){
    console.log(err);
  }
  const str = data.toString().split("\n");
  const str_fixed = str.map(ele => {return ele.split("").reverse().join("");}).join("\n");
  console.log(str_fixed);
});

fs.writeFile("text.txt", `يا لا لا لا لا لا لا
رجاوي فلسطيني
يا لا لا لا لا لا لا
حبيت نمشي شكون يديني`
,(err) => {//also async method
  if(err){
    console.log(err);
  }
  console.log("file rewritten");
});

if(!fs.existsSync("./folder")){
  fs.mkdir("./folder",(err,data) => {//also async method
    if(err){
      console.log(err);
    }
  });
}
else{
  fs.rmdir("./folder",(err,data) => {//also async method
    if(err){
      console.log(err);
    }
  });
}
*/

const gloryhammer_stream = fs.createReadStream('gloryhammer_lore.txt', {encoding:"utf8"});
const copy = fs.createWriteStream('copy.txt')

let num = 1;

gloryhammer_stream.on('data', (chunk) => {//everything you get a new chunk of data...
  console.log(`chunk #${num}`);
  num+=1;
  console.log(chunk);
  copy.write(chunk);
}) //alternative: gloryhammer_stream.pipe(copy);

/*
let seconds = 1;

const interval = setInterval(() => {
  console.log(`${seconds} seconds have passed`);
  seconds += 1;
}, 1000);

setTimeout(() => {
  console.log("interval stopped");
  clearInterval(interval);
}, 10000)
*/