import adminModel from "../models/adminModel.js";
import jsonwebtoken from "jsonwebtoken";
import bycript from "bcryptjs";
import { config } from "../../config.js";

const adminLoginController = {};

adminLoginController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid email" });
  }
  try {
    const adminFound = await adminModel.findOne({ email });
    if (!adminFound) {
      return res.status(400).json({ message: "Client not found" });
    }
    if (adminFound.timeOut && adminFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Account blocked" });
    }
    const isMatch = await bycript.compare(password, adminFound.password);
    if (!isMatch) {
      adminFound.loginAttempts = (adminFound.loginAttempts || 0) + 1;
      if (adminFound.loginAttempts >= 5) {
        adminFound.timeOut = Date.now() + 5 * 60 * 1000;
        adminFound.loginAttempts = 0;
        await adminFound.save();
        return res.status(403).json({ message: "Account blocked" });
      }
      await adminFound.save();
      return res.status(400).json({ message: "Incorrect pasword" });
    }
    adminFound.loginAttempts = 0;
    adminFound.timeOut = null;
    await adminFound.save();
    const token = jsonwebtoken.sign(
      { id: adminFound._id, userType: "Admin" },
      config.jwt.secret,
      { expiresIn: "3d" },
    );

    res.cookie("authCookie", token);
    return res.status(200).json("Login successful");
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default adminLoginController;
