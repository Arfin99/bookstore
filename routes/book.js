import express from "express";
const router = express.Router();
import { addBook, removeBook, getBook, updateBook, searchBooks } from "../controllers/book.js";
import auth from "../middleware/auth.js";


router.get("/", auth, getBook);
router.get("/search", auth, searchBooks);
router.post("/", auth, addBook);
router.put("/remove", auth, removeBook);
router.put("/:book_id", auth, updateBook);

export default router;