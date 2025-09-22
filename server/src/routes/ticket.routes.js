import express from "express";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
} from "../controllers/ticket.controllers.js";

const router = express.Router();

router.post("/", isLoggedin, createTicket);
router.get("/", isLoggedin, getTickets);
router.get("/:id", isLoggedin, getTicket);
router.delete("/:id", isLoggedin, deleteTicket);

export default router;
