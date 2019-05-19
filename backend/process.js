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
          // console.log(value);
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

  getLastData(client, collection, param, value){
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try{
        db.collection(collection).find({[param]: value}).sort({$natural: -1}).limit(1).next().then(resp => {
           resolve(resp)
        })
      } catch(err){
        console.log(err);
      }
    })
  }

  customLimit(client, collection, param, value, limit){
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try{
        db.collection(collection).find({[param]: value}).sort({$natural: -1}).limit(limit).toArray((err, resp) => {
           resolve(resp)
        })
      } catch(err){
        console.log(err);
      }
    })
  }

  deleteOne(client, collection, token) {
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try {
        db.collection(collection).deleteOne({ token: token }, (err, result) => {
          if (err) {
            resolve(false);
          } else {
            resolve(result);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  createExpire(client, collection) {
    const db = client.db("finalProject");
    return new Promise(resolve => {
      try {
        db.collection(collection).createIndex(
          { expireAt: 1 },
          { expireAfterSeconds: 0 },
          () => {
            resolve(true);
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  }
};
