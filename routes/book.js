import express from "express";
const router = express.Router();
import { addBook, removeBook, getBook } from "../controllers/book.js";
import auth from "../middleware/auth.js";


router.get("/", auth, getBook);
router.post("/", auth, addBook);
router.put("/remove", auth, removeBook);

export default router;