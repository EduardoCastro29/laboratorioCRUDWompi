import express from "express";
import registerClienteController from "../controller/RegisterClientController.js";

const router = express.Router();
router
  .route("/")
  .post(registerClienteController.register);
router
  .route("/verifyCodeEmail")
  .post(registerClienteController.verifyCode);

export default router;
