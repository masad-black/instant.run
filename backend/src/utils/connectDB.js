import mongoose from "mongoose";

import { envVar } from "./constant.js";

async function connectToDB() {
  try {
    await mongoose.connect(envVar.MONGOOSE_URL);
    console.log(`Connected to DB - `, mongoose.version);
  } catch (error) {
    console.log(`Error while connecting to DB - ${error}`);
  }
}

export { connectToDB };
