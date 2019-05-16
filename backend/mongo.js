const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });
const promise = new Promise(function(resolve) {
  client.connect(function(err, c) {
    if (err) {
      throw err;
    } else {
      console.log("connected to mongoDB");
      //   console.log(c.db('finalProject').collection('users').find);
      resolve(client);
    }
  });
});

module.exports = promise;
