const express = require("express");
const router = express.Router();
const http = require("http");
const app = express();
const path = require("path");

const mongo = require(__dirname + "/mongo");
// const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

let list_user = 0;

var clients = [];

app.use(express.static(path.join(__dirname, "/../web/frontend/build/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../web/frontend/build/index.html"));
});

// import passport and passport-jwt modules
const passport = require("passport");
const passportJWT = require("passport-jwt");

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "mohammedwazier";

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

app.use(passport.initialize());

app.use("/api", require(path.join(__dirname, "/api/api")));
// app.use(
//   "/apiMicrocontroller",
//   require(path.join(__dirname, "/apiMicrocontroller/apiMicrocontroller"))
// );

let httpServer = http.createServer(app);
let server = httpServer.listen(port, () => {
  console.log("Server is running on Port http://localhost:" + port);
});

// Socket IO Interface
mongo.then(function(client) {
  const io = require("socket.io")(server);
  const db = client.db("finalProject");

  io.on("connection", socket => {
    list_user++;
    console.log("new user connected, List User :  " + list_user);

    socket.on("toggle", data => {
      console.log(data, socket.id);
    });

    socket.on("login", data => {
      var clientInfo = new Object();
      // clientInfo.username = data.username;
      // clientInfo.clientId = socket.id;

      // clients.push(clientInfo);
      db.collection("log").countDocuments((err, count) => {
        const logUser = {};
        logUser._id = count + 1;
        logUser.username = data.username;
        logUser.socket = socket.id;
        db.collection("log").insertOne(logUser, (err, resp) => {
          if (!err) {
            console.log(logUser);
          } else {
            console.log("error adding user to LOG");
          }
        });
      });

      // io.sockets.emit("client", clientInfo);
    });

    // socket.on("update_data", data => {

    // })

    // socket.on("update_monitoring", data=> {

    // })

    socket.on("disconnect", function() {
      console.log("disconnected");
      list_user--;
      console.log("new user connected, List User :  " + list_user);
      console.log(socket.id);
    });
  });
});

// End Socket IO Interface
