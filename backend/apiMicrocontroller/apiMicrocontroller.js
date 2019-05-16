const express = require("express");
const bodyParser = require("body-parser");
const mongo = require(__dirname + "/../mongo");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongo.then(function(client) {
  // users(client);
  data(client);
});

function data(client) {
  router.get("/login", (req, res) => {
    res.send("asdasdadasd");
  });
}

module.exports = router;
