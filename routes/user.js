import express from "express";
const router = express.Router();
import { userRegistration, userProfile } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.get("/", auth, userProfile);
router.post("/", userRegistration);

export default router;