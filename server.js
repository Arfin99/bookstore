import express from "express";
import cors from "cors";
import { port } from "./utils/environment_prop_access.js";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import orderRoutes from "./routes/order.js";
import reviewRoutes from "./routes/review.js";

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Server is ok....");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
