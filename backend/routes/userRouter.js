import express from "express";
import { register, login } from "../controllers/userController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
