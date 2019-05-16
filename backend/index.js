const express = require("express");
const router = express.Router();
const http = require("http");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.use(
  "*",
  router.get("", (req, res) => {
    console.log("hehehe");
    res.send("Hello Worlds!");
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  req.setTimeout(0);
  next();
});
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.json({
    type: function(req) {
      return req.headers["content-type"] === "*/*";
      server.timeout = 1000;
    }
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

let httpServer = http.createServer(app);
let server = httpServer.listen(port, () => {
  console.log("Server is running on Port http://localhost:" + port);
});

// Socket IO Interface

const io = require("socket.io")(server);

var list_user = 0;

io.on("connection", socket => {
  list_user++;
  console.log("new user connected, List User :  " + list_user);

  socket.on("login", data => {
    var clientInfo = new Object();
    clientInfo.username = data.username;
    clientInfo.clientId = socket.id;

    //Update to mongoDB
  });
  socket.on("disconnect", function() {
    console.log("disconnected");
    list_user--;
    console.log("new user connected, List User :  " + list_user);
  });
});

// End Socket IO Interface
