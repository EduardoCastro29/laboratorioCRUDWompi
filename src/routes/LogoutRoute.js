import express from "express";
import logout from "../controller/LogoutController.js";
import {validateAuthCookie} from "../middlewares/AuthRoutes.js";

const router = express.Router();
router.route("/").post(validateAuthCookie(["Admin", "Client"]), logout.logout);

export default router;
