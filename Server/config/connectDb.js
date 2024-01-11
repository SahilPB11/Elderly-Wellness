import mongoose from "mongoose";
// conncted with database
const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.Mongo_URl, {
        dbName: "Elderly-Wellness",
      })
      .then((c) =>
        console.log(`Databse connected safely with ${c.connection.host}`)
      );
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
