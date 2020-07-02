"use strict";

import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String, required: true },
    email: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Student", StudentSchema);
