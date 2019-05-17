const express = require("express");
const bodyParser = require("body-parser");
const mongo = require(__dirname + "/../mongo");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongo.then(function(client) {
  data(client);
});

function data(client) {
  router.post("/setLogin", (req, res) => {
    // res.send("asdasdadasd");
  });

  router.post("/logoutMicro", (req, res) => {});
}

module.exports = router;
