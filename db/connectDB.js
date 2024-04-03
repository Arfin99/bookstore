import mongoose from "mongoose";
import { mongo_uri } from "../utils/environment_prop_access.js";

const connectDB = () => {
  mongoose
    .connect(mongo_uri)
    .then(() => console.log("Database Connected"))
    .catch((error) => {
      console.log(`Database Connection Error  ${error}`);
      process.exit(1);
    });
};

export default connectDB;