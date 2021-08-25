const mongoose = require("mongoose");
//const loadModels = require("../../app/models")

const URI = `mongodb://${
  !process.env.DB_USERNAME || !process.env.DB_PASSWORD
    ? ""
    : `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
}${process.env.DB_HOST}${
  process.env.DB_PORT ? `:${process.env.DB_PORT}` : ""
}/${process.env.DB_NAME}`;

module.exports = () => {
  console.log('\x1b[33m%s','Connecting to MongoDB...')
  const connect = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect(
      URI,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      },
      (e) => {
        if (e) console.log('\x1b[31m%s\x1b[0m', `Error connecting to Database: ${e}`);
        else console.log('\x1b[32m%s\x1b[0m',`Connection successful`);
      }
    );
  };
  connect()
  let count = 0
  mongoose.connection.on('error', () => {
    count++
    console.log('\x1b[33m%s\x1b[0m','Retrying to connect to database ...')
    if(count < 3) connect()
    else console.log('\x1b[33m%s\x1b[0m','Failed to connect to database')
  })
};
