const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log("[" + Date.now() + "] Ping Received");
  response.sendStatus(200);
});

app.listen(8080);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 300000);

var cp = require("child_process");
cp.fork(__dirname + "/main.js");

app.listen(process.env.PORT);
setInterval(() => {
  console.log("Server Refreshing...");
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 180000);

app.get("/wakeup", function (request, response) {
  console.log("i'm awake");
  response.send("i'm awake");
});
