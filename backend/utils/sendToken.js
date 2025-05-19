export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  const cookieExpireDays = process.env.COOKIE_EXPIRE || 7; // Fallback to 7 days

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,         // Required for cross-site cookies over HTTPS
      sameSite: "None",     // Required for cross-origin (Vercel frontend)
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
