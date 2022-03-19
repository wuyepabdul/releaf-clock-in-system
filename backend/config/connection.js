const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_COMPASS, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected to mongodb: ${conn.connection.host}`);
  } catch (error) {
    console.log("mongoError", error.message);
  }
};

module.exports = dbConnection;
