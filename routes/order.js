import express from "express";
const router = express.Router();
import { addOrder, getOrderDetails } from "../controllers/order.js";
import auth from "../middleware/auth.js";

router.get("/", auth, getOrderDetails);
router.post("/", auth, addOrder);

export default router;
