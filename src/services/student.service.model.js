"use strict";

import Student from "../models/student.model";
import Course from "../models/course.model";

exports.getAll = async () => {
  return await Student.find().populate("courses").exec();
};

exports.getById = async (id) => {
  return await Student.findById(id).populate("courses").exec();
};

exports.countStudents = async (id) => {
  return await Student.find({ courses: id }).countDocuments();
};

exports.create = async (studentParam) => {
  if (await Student.findOne({ email: studentParam.email })) {
    throw "Email already exists!";
  }
  const student = new Student(studentParam);

  // save student
  await student.save();
};

exports.update = async (id, studentParam) => {
  const student = await Student.findById(id);

  // validate
  if (!student) throw "Student not found";
  if (
    student.email !== studentParam.email &&
    (await Student.findOne({ email: studentParam.email }))
  ) {
    throw 'Email "' + studentParam.email + '" is already taken';
  }

  await Object.assign(student, studentParam);

  await student.save();
};

exports._delete = async (id) => {
  await Student.findOneAndDelete(id, { useFindAndModify: false });
};

exports.assignCourse = async (id, courseParam) => {
  const student = await Student.findById(id);
  const course = await Course.findById(courseParam.courses);

  // validate
  if (!student) throw "Student not found";
  if (!course) throw "Course not found";
  if (
    await Student.findOne({
      $and: [{ _id: student._id }, { courses: courseParam.courses }],
    })
      .populate("courses")
      .exec()
  ) {
    throw "The course is already assigned to the student!";
  }

  await student.updateOne({ $push: { courses: courseParam.courses } });
  await student.save();
};
