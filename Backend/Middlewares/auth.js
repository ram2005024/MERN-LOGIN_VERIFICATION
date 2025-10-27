import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.json({ success: false, message: "Token expired or missing" });
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decodedToken.id };
    next();
  } catch (error) {
    console.log("JWT Verify Error:", error.message);
    return res.json({
      success: false,
      message: "Invalid token",
    });
  }
};
