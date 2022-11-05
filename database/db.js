const mongoose = require("mongoose");

const Connection = () => {
  //const URI = process.env.URI;
  const URL = process.env.URL;
  try {
    mongoose.connect(URL, {});
    console.log("Database are connected");
  } catch (error) {
    conssole.log("No Connected Database");
  }
};

module.exports = Connection;
