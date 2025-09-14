import express from "express";
import { isLoggedin } from "../middlewares/auth.middleware.js";
import {
  createTicket,
  getTickets,
  getTicket,
} from "../controllers/ticket.controllers.js";

const router = express.Router();

router.post("/create", isLoggedin, createTicket);
router.get("/tickets", isLoggedin, getTickets);
router.get("/ticket/:id", isLoggedin, getTicket);

export default router;
