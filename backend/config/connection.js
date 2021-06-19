import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
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

export default dbConnection;
