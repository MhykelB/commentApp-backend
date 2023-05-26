const express = require("express");
require("express-async-errors");
const cors = require("cors");
const expressApp = express();
const route = require("./routes/routes");
const authRoute = require("./routes/authRoutes");
const connectDB = require("./db/connect");
const errorHandler = require("./errors/error-handler");
require("dotenv").config();
const authMiddleware = require("./middlware/authMiddleWare");

// middleware
const corsOptions = {
  origin: false,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// expressApp.use((req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
// });
expressApp.options("*", cors(corsOptions));
expressApp.use(cors(corsOptions));
expressApp.use(express.static("../front-end"));
expressApp.use(express.json());
expressApp.use("/auth", authRoute);
expressApp.use("/api/v1/comments", authMiddleware, route);
expressApp.use(errorHandler);

expressApp.get("/", (req, res) => {
  res.send("heloooo, this app is working properly");
});

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
