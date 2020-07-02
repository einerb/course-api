"use strict";

module.exports = (app) => {
  import studentController from "../controllers/student.controller";
  import courseController from "../controllers/course.controller";

  var router = require("express").Router();

  // Student Routes
  router.post("/create", studentController.create);
  router.get("/", studentController.getAll);
  router.get("/:id", studentController.getById);
  router.update("/:id", studentController.update);
  router.delete("/:id", studentController._delete);

  // Course Routes
  router.post("/create", courseController.create);
  router.get("/", courseController.getAll);
  router.get("/:id", courseController.getById);
  router.update("/:id", courseController.update);
  router.delete("/:id", courseController._delete);

  app.use("/api/", router);
};
