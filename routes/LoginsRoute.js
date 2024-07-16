import express from "express";
import {
  createLogin,
  resetPassword,
  updateLogin,
} from "../controllers/Logins.js";
import { customerLogin } from "../controllers/Verify.js";

const router = express.Router();

router.post("/login/create", createLogin);
router.patch("/login/:id", updateLogin);
router.patch("/login/password/:id", resetPassword);
router.post("/login", customerLogin);

export default router;
