"use strict";

import mongoose from "mongoose";

const CourseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    schedule: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", CourseSchema);
