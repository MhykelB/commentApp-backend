const express = require("express");
require("express-async-errors");
const expressApp = express();
const route = require("./routes/routes");
const authRoute = require("./routes/authRoutes");
const connectDB = require("./db/connect");
const errorHandler = require("./errors/error-handler");
require("dotenv").config();
const authMiddleware = require("./middlware/authMiddleWare");

// middleware
expressApp.use(express.static("../front-end"));
expressApp.use(express.json());
expressApp.use("/auth", authRoute);
expressApp.use("/api/v1/comments", authMiddleware, route);
expressApp.use(errorHandler);
// expressApp.get("/", (req, res) => {
//   res.send("heloooo");
// });

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("connected to database");
    });
    // await userSchema.deleteMany()
    expressApp.listen(port, () => {
      console.log(`server is up and running, listening to port ${port} `);
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
start();
