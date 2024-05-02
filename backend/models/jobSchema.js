import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: 3,
    maxLength: 20,
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: 10,
  },
  category: {
    type: String,
    required: [true, "Please provide job category"],
  },
  country: {
    type: String,
    required: [true, "Please provide job country"],
  },
  city: {
    type: String,
    required: [true, "Please provide job city"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location"],
  },
  fixedSalary: {
    type: Number,
  },
  salaryFrom: {
    type: Number,
  },
  salaryTo: {
    type: Number,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
