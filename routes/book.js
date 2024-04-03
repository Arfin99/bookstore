import express from "express";
const router = express.Router();
import { addBook } from "../controllers/book.js";
import auth from "../middleware/auth.js";

router.post("/", auth, addBook);

export default router;