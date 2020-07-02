"use strict";

import courseService from "../services/course.service.model";

exports.create = (req, res, next) => {
  courseService
    .create(req.body)
    .then(() =>
      res.status(200).json({
        message: "Course successfully registered!",
      })
    )
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  courseService
    .getAll()
    .then((courses) =>
      res.status(200).json({
        data: courses,
        message: "Successful course list!",
      })
    )
    .catch((err) => next(err));
};

exports.getById = (req, res, next) => {
  courseService
    .getById(req.params.id)
    .then((course) =>
      course
        ? res.status(200).json({
            data: course,
            message: "Successful course list!",
          })
        : res.status(404).json({
            message: "Course not found!",
          })
    )
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  courseService
    .update(req.params.id, req.body)
    .then(() =>
      res.status(200).json({
        message: "Successfully updated course!",
      })
    )
    .catch((err) => next(err));
};

exports._delete = (req, res, next) => {
  courseService
    ._delete(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "Course successfully deleted!",
      })
    )
    .catch((err) => next(err));
};
