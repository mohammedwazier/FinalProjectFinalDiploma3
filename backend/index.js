const express = require("express");
const router = express.Router();
const http = require("http");
const app = express();

const server = http.createServer(app);

const port = 5000;

app.use(
  "*",
  router.get("", (req, res) => {
    console.log("hehehe");
    res.send("Hello Worlds!");
  })
);

server.listen(port, () => {
  console.log("Server is running on Port http://localhost:" + port);
});

const io = require("socket.io")(server);

io.on("connection", socket => {
  list_user++;
  console.log("new user connected, List User :  " + list_user);
  socket.on("disconnect", function() {
    console.log("disconnected");
    list_user--;
    console.log("new user connected, List User :  " + list_user);
  });
});
