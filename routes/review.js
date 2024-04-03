import express from "express";
const router = express.Router();
import { addReview, getReviewDetails } from "../controllers/review.js";
import auth from "../middleware/auth.js";

router.get("/", auth, getReviewDetails);
router.post("/", auth, addReview);

export default router;