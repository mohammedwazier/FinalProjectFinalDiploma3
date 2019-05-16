const express = require("express");
const router = express.Router();
const http = require("http");
const app = express();
const path = require("path");
// const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

let list_user = 0;

app.use(
  "*",
  router.get("/", (req, res) => {
    console.log("hehehe");
    res.send("Hello Worlds!");
  })
);

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

const io = require("socket.io")(server);

io.on("connection", socket => {
  list_user++;
  console.log("new user connected, List User :  " + list_user);

  socket.on("toggle", data => {
    console.log(data, socket.id);
  });

  socket.on("login", data => {
    var clientInfo = new Object();
    clientInfo.username = data.username;
    clientInfo.clientId = socket.id;

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
    console.log();
  });
});

// End Socket IO Interface
