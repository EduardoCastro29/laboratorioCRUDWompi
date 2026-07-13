import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bycript from "bcryptjs";
import clientModel from "../models/ClientModel.js";
import { config } from "../../config.js";
import { error, info } from "console";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await clientModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Client exist" });
    }
    const passwordHashed = await bycript.hash(password, 10);
    const randomNumber = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      { randomNumber, name, email, password: passwordHashed, isActive: true },
      config.jwt.secret,
      { expiresIn: "15m" },
    );
    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOption = {
      from: config.email.user_email,
      to: email,
      subject: "verificar tu cuenta",
      text: "código es: " + randomNumber + " " + " Expira en 15 minutos",
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({message: "Email sent"});
    });
  } catch (error) {
    console.log("error"+error)
    return res.status(500).json({message: "internal server error"});
  }
};
