const express = require("express");
const app = express();

console.log("🔥 server.js LOADED");

app.get("/", (req, res) => {
  res.send("OK");
});

// ⛔ async 밖
const server = app.listen(3000, "0.0.0.0", () => {
  console.log("🔥 Server listening on 3000");
});

setInterval(() => {
  console.log("⏱ alive");
}, 5000);
