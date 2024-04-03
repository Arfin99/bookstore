import express from "express";
const router = express.Router();
import {
  addBook,
  removeBook,
  getBook,
  updateBook,
  searchBooks,
} from "../controllers/book.js";
import auth from "../middleware/auth.js";
import admin_auth from "../middleware/admin_auth.js";

router.get("/", auth, getBook);
router.get("/search", auth, searchBooks);
router.post("/", auth, admin_auth, addBook);
router.put("/remove", auth, admin_auth, removeBook);
router.put("/:book_id", auth, admin_auth, updateBook);

export default router;
