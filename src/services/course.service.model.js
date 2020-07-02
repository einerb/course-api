"use strict";

import Course from "../models/course.model";

exports.getAll = async () => {
  return await Course.find();
};

exports.getById = async (id) => {
  return await Course.findById(id);
};

exports.create = async (courseParam) => {
  if (await Course.findOne({ name: courseParam.name })) {
    throw new Error("Name already exists!");
  }
  const student = new Course(courseParam);

  // save course
  await course.save();
};

exports.update = async (id, courseParam) => {
  const course = await Course.findById(id);

  // validate
  if (!course) throw "Course not found";
  if (
    course.name !== courseParam.name &&
    (await Course.findOne({ name: courseParam.name }))
  ) {
    throw 'Name "' + courseParam.name + '" is already taken';
  }

  await Course.findOneAndUpdate(course, courseParam, {
    useFindAndModify: false,
  });

  await course.save();
};

exports._delete = async (id) => {
  await Course.findOneAndDelete(id, { useFindAndModify: false });
};
