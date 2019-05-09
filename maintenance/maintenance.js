const express = require("express");
const router = express.Router();
const http = require("http");
const app = express();
const path = require("path");

const server = http.createServer(app);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.use(
  "*",
  router.get("", (req, res) => {
    console.log("hehehe");
    res.sendFile(path.join(__dirname, "index.html"));
  })
);

const port = 5000;

server.listen(port, () => {
  console.log("Server maintenance is running on Port http://localhost:" + port);
});
