import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

export const login = () => {
  return {
    type: "LOGIN",
  };
};
