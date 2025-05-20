
export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
  });
};
