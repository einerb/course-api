"use strict";

import mongoose from "mongoose";

const CourseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    schedule: { type: String, required: true },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", CourseSchema);
