"use strict";

import studentService from "../services/student.service.model";

exports.create = (req, res, next) => {
  studentService
    .create(req.body)
    .then(() =>
      res.status(200).json({
        message: "Student successfully registered!",
      })
    )
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  studentService
    .getAll()
    .then((students) =>
      res.status(200).json({
        data: students,
        message: "Successful student list!",
      })
    )
    .catch((err) => next(err));
};

exports.getById = (req, res, next) => {
  studentService
    .getById(req.params.id)
    .then((student) =>
      student
        ? res.status(200).json({
            data: student,
            message: "Successful student list!",
          })
        : res.status(404).json({
            message: "Student not found!",
          })
    )
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  studentService
    .update(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Student successfully updated!",
      })
    )
    .catch((err) => next(err));
};

exports._delete = (req, res, next) => {
  studentService
    ._delete(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "student successfully deleted!",
      })
    )
    .catch((err) => next(err));
};

exports.assignCourse = (req, res, next) => {
  studentService
    .assignCourse(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully assigned course!",
      })
    )
    .catch((err) => next(err));
};