"use strict";

import studentController from "../controllers/student.controller";
import courseController from "../controllers/course.controller";

module.exports = (app) => {
  var router = require("express").Router();

  // Student Routes
  router.post("/students/create", studentController.create);
  router.get("/students/", studentController.getAll);
  router.get("/students/:id", studentController.getById);
  router.get("/students/count/:id", studentController.countStudents);
  router.put("/students/update/:id", studentController.update);
  router.put("/students/assign/:id", studentController.assignCourse);
  router.delete("/students/delete/:id", studentController._delete);

  // Course Routes
  router.post("/courses/create", courseController.create);
  router.get("/courses/", courseController.getAll);
  router.get("/courses/:id", courseController.getById);
  router.put("/courses/update/:id", courseController.update);
  router.delete("/courses/delete/:id", courseController._delete);

  app.use("/api/", router);
};
