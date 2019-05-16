module.exports = class process {
  constructor() {}

  checkOne(client, collection, param, value) {
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try {
        db.collection(collection).findOne({ [param]: value }, function(
          err,
          response
        ) {
          if (!response) {
            resolve(false);
          } else {
            resolve(response);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getAll(client, collection, param, value) {
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try {
        db.collection(collection)
          .find()
          .toArray((err, response) => {
            if (!response) {
              resolve(false);
            } else {
              resolve(response);
            }
          });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertOne(client, collection, value) {
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try {
        db.collection(collection).countDocuments((err, count) => {
          value._id = count + 1;
          console.log(value);
          db.collection(collection).insertOne(value, (err, response) => {
            if (err) {
              resolve(false);
            } else {
              resolve(response);
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
};
