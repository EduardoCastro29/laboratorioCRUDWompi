import clientModel from "../models/ClientModel.js";
import jsonwebtoken from "jsonwebtoken";
import bycript from "bcryptjs";
import { config } from "../../config.js";

const clientLoginController = {};

clientLoginController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid email" });
  }
  try {
    const clientFound = await clientModel.findOne({ email });
    if (!clientFound) {
      return res.status(400).json({ message: "Client not found" });
    }
    if (clientFound.timeOut && clientFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Account blocked" });
    }
    const isMatch = await bycript.compare(password, clientFound.password);
    if (!isMatch) {
      clientFound.loginAttempts = (clientFound.loginAttempts || 0) + 1;
      if (clientFound.loginAttempts >= 5) {
        clientFound.timeOut = Date.now() + 5 * 60 * 1000;
        clientFound.loginAttempts = 0;
        await clientFound.save();
        return res.status(403).json({ message: "Account blocked" });
      }
      await clientFound.save();
      return res.status(400).json({ message: "Incorrect pasword" });
    }
    clientFound.loginAttempts = 0;
    clientFound.timeOut = null;
    await clientFound.save();
    const token = jsonwebtoken.sign(
      { id: clientFound._id, userType: "Client" },
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

export default clientLoginController;
