import UserModel from "../Model/UserModel.js";
export const getUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.json({ success: false, message: "No user found" });
    res.json({
      success: true,
      user: {
        name: user.name,
        isVerified: user.isVerified,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured while fetching user data",
    });
  }
};
