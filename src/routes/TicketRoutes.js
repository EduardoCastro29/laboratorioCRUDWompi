import express from "express";
import ticketController from "../controller/TicketController.js";
import {validateAuthCookie} from "../middlewares/AuthRoutes.js";

const router = express.Router();
router
  .route("/")
  .get(validateAuthCookie(["Admin"]), ticketController.getAllTicket)
  .post(validateAuthCookie(["Client"]), ticketController.insertTicket);

router
  .route("/:id")
  .put(validateAuthCookie(["Admin", "Client"]), ticketController.updateTicket)
  .delete(validateAuthCookie(["Admin"]), ticketController.deleteTicket);

export default router;
