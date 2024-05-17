export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Check if the environment is production or development
  if (process.env.NODE_ENV === "production") {
    // In production, set SameSite attribute to None only for HTTPS
    options.sameSite = "None";
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
