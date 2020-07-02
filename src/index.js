"use strict";

require("rootpath")();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import errorHandler from "./utils/error-handler";
import logger from "./utils/logger";

// Create server express
const app = express();

// Body Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use CORS
app.use(cors());

// global error handler
app.use(errorHandler);

// Connection to MongoDB
const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer
  .getConnectionString()
  .then((mongoUri) => {
    const mongooseOpts = {
      promiseLibrary: Promise,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on("error", (e) => {
      if (e.message.code === "ETIMEDOUT") {
        logger.error(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      logger.error(e);
    });

    mongoose.connection.once("open", async () => {
      logger.info(`Database running on ${mongoUri}`);
    });
  })
  .catch((err) => {
    logger.error("Cannot connect to the database", err);
    process.exit();
  });

// routes
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO TASK API v. 0.0.1" });
});
require("./routes")(app);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3000;

// Start server
app.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port}`);
});
