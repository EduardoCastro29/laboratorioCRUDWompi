import express from "express";
import registerAdminController from "../controller/RegisterAdminController.js";
import {validateAuthCookie} from "../middlewares/AuthRoutes.js";

const router = express.Router();
router.route("/").post(validateAuthCookie(["Admin"]),registerAdminController.register);
router.route("/verifyCodeEmail").post(validateAuthCookie(["Admin"]),registerAdminController.verifyCode);

export default router;
