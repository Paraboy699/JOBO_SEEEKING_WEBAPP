import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const isEmailExists = await User.findOne({ email });

  if (isEmailExists) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });

  sendToken(user, 201, res, "User registered successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email, password, and role", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid role", 403));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
});

export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});
