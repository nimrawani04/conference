import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import committeeRoutes from "./routes/committeeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", committeeRoutes);
app.use("/api", uploadRoutes);
app.use("/api", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", registrationRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
