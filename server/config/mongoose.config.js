import mongoose from "mongoose";
import dotenv from "dotenv";
import { success, error } from "../config/chalk.config.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB = process.env.DB;

async function connectToDb() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(`${MONGO_URI}${DB}`, {
      retryWrites: true,
    });
    success(`Connection to ${DB} established.`);
  } catch (err) {
    error(`Something went wrong... ${err}`);
  }
}

export default connectToDb;

// const connectDB = () => {
//   // mongoose.set('strictQuery' = true);
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/productMngrDB", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       retryWrites: true,
//     })
//     .then(() => console.log("Established a connection to the database"))
//     .catch((err) =>
//       console.log("Something went wrong when connecting to the database", err)
//     );
// };

// module.exports = connectDB;
