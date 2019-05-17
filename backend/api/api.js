// Link
// /api/login

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// const passport = require("passport");
const passportJWT = require("passport-jwt");

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "mohammedwazier";

const mongo = require(__dirname + "/../mongo");
const variable = require(__dirname + "/../variable/variable");
const process = require(__dirname + "/../process");
const sendMongo = new process();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongo.then(function(client) {
  data(client);
});

function data(client) {
  router.post("/login", (req, res) => {
    if (!req.body.username && req.body.password) {
      res.status("400").json("FAILED_LOGIN");
    } else {
      sendMongo
        .checkOne(client, "users", "username", req.body.username)
        .then(usernameResp => {
          if (usernameResp !== false) {
            sendMongo
              .checkOne(client, "users", "password", req.body.password)
              .then(passwordResp => {
                if (passwordResp === false) {
                  res.status("400").json("WRONG_PASSWORD");
                } else {
                  let payload = { id: usernameResp._id };
                  let token = jwt.sign(payload, jwtOptions.secretOrKey);
                  sendMongo.createExpire(client, "users").then(() => {
                    const sessions = variable.dataSession;
                    sessions._id = usernameResp._id;
                    sessions.username = usernameResp.username;
                    sessions.token = token;
                    var date = new Date();
                    date.setHours(new Date().getHours() + 20);
                    sessions.expireAt = date;
                    sendMongo
                      .insertOne(client, "sessions", sessions)
                      .then(insertResp => {
                        if (!insertResp) {
                          res.status("400").json("FAILED_LOGIN");
                        } else {
                          delete sessions.expireAt;
                          res.json({ msg: "ok", data: sessions });
                        }
                      });
                  });
                }
              });
          } else {
            res.status("400").json("WRONG_USERNAME");
          }
        });
    }
  });

  router.post("/logout", (req, res) => {
    if (req.headers.authorization == null) {
      return res.status(400).json("NO_SESSION_IS_VALID");
    }

    const auth = req.headers.authorization.split(" ")[1];
    sendMongo
      .checkOne(client, "sessions", "token", auth)
      .then(checkTokenResp => {
        if (checkTokenResp === false) {
          res.status("400").json("WRONG_TOKEN");
        } else {
          sendMongo.deleteOne(client, "sessions", auth).then(resp => {
            if (resp === false) {
              res.status("400").json("FAILED");
            } else {
              res.status("400").json("SUCCESS");
            }
          });
        }
      });
  });

  router.post("/register", (req, res) => {
    if (req.body.username && req.body.email && req.body.password) {
      sendMongo
        .checkOne(client, "users", "username", req.body.username)
        .then(resp => {
          if (resp === false) {
            sendMongo
              .checkOne(client, "users", "email", req.body.email)
              .then(resp => {
                if (resp === false) {
                  const regis = variable.dataRegis;
                  regis.username = req.body.username;
                  regis.email = req.body.email;
                  regis.password = req.body.password;

                  sendMongo.insertOne(client, "users", regis).then(final => {
                    if (!final) {
                      console.log("error");
                      res.status("400").json("FAILED_REGISTRATION");
                    } else {
                      console.log("success");
                      res.status("400").json("SUCCESS");
                    }
                  });
                } else {
                  res.status("400").json("EMAIL_EXIST");
                }
              });
          } else {
            res.status("400").json("USERNAME_EXIST");
          }
        });
    } else {
      res.status("400").json("Failed Registration");
    }
  });
}

module.exports = router;
