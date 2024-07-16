import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { isAdmin, verifySignin, verifyToken } from "../controllers/Verify.js";

const router = express.Router();

router.get("/users", verifyToken, isAdmin, getUsers); //admin only can get all users
router.get("/Users/:id", getUser);
router.post("/Users", createUser);
router.patch("/Users/:id", updateUser);
router.delete("/Users/:id", deleteUser);

export default router;
