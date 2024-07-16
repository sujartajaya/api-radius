import express from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByid,
} from "../controllers/Customers.js";

import { verifySignin, verifyToken } from "../controllers/Verify.js";

const router = express.Router();

router.get("/customers", verifyToken, getCustomerByid);
router.get("/customers/:id", getCustomer);
router.post("/customers", createCustomer);
router.patch("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);
router.post("/customer/login", verifySignin);

export default router;
