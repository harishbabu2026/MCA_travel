const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected with host name ${res.connection.host}`);
    return res;
  } catch (error) {
    console.log(`error on db connection ${error}`);
  }
};

module.exports = connectDb;
