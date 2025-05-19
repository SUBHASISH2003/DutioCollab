export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieExpireDays = process.env.COOKIE_EXPIRE || 7;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
