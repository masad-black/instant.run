import { app } from "./app.js";
import { connectToDB } from "./utils/connectDB.js";

// connecting to mongoose DB
connectToDB()
  .then()
  .catch((error) => {
    console.log(`Error in index.js (DB): ${error}`);
  });

// quick code route
import { router as quickcodeRoute } from "./api/routers/quikCode.router.js";
app.use("/api/quickcode", quickcodeRoute);

// files router
import { router as fileRouter } from "./api/routers/file.route.js";
app.use("/api/files", fileRouter);

app.get("/", (req, res) => {
  res.send("Hello online editor!!!");
});
