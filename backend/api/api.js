// Link
// /api/login

const express = require("express");
const bodyParser = require("body-parser");
const mongo = require(__dirname + "/../mongo");

const router = express.Router();

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
    console.log("asdasd");
    res.send("asdasdasd");
  });

  router.post("/register", (req, res) => {
    if (req.body.username && req.body.email && req.body.password) {
      //Check Username
      sendMongo
        .checkOne(client, "users", "username", req.body.username)
        .then(resp => {
          if (resp === false) {
            //Check Password
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
