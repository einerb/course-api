"use strict";

require("rootpath")();

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import errorHandler from "./utils/error-handler";
import logger from "./utils/logger";
import config from "./config/";

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
mongoose.connect(config.URI + config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => logger.error("Cannot connect to the database", err));
db.once("open", () => logger.info(`Database running on ${config.URI}`));

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
