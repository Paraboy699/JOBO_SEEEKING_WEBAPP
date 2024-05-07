import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker is not authorized for this", 401)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("Employer is not authorized for this", 401));
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("Employer is not authorized for this", 401));
    }
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer is not authorized for this", 401));
  }
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Resume required", 400));

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpg"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file format", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(cloudinaryResponse.error || "Unknown cloudinary error ");
    return next(new ErrorHandler("Error uploading resume", 500));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  if (!jobId) {
    return next(new ErrorHandler("Job not found", 400));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 400));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    jobId,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Application posted successfully",
    application,
  });
});
