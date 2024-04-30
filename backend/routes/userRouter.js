import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", register);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
