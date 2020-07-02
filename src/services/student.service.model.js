"use strict";

import Student from "../models/student.model";

exports.getAll = async () => {
  return await Student.find();
};

exports.getById = async (id) => {
  return await Student.findById(id);
};

exports.create = async (studentParam) => {
  if (await Student.findOne({ email: studentParam.email })) {
    throw new Error("Email already exists!");
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

  await Student.findOneAndUpdate(student, studentParam, {
    useFindAndModify: false,
  });

  await student.save();
};

exports._delete = async (id) => {
  await Student.findOneAndDelete(id, { useFindAndModify: false });
};
