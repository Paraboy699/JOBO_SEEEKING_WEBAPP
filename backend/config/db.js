import mongoose from "mongoose";

export const dbconnnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB_SEEKING",
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));
};
