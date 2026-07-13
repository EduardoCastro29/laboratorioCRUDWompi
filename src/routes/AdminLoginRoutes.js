import express from "express";
import adminLoginController from "../controller/LoginAdminController.js";
const router = express.Router();
router.route("/").post(adminLoginController.login);
export default router;
