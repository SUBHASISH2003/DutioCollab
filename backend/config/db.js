import mongoose from "mongoose";

export const connection = () => {
  mongoose.connect(process.env.MONGO_URI || "mongodb+srv://codingsaikat:saikat123@cluster0.fgfcsxr.mongodb.net/", {
      dbName: "WorkHive",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });
};