import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Customers from "./models/CustomersModel.js";
import Users from "./models/UsersModel.js";
import Logins from "./models/LoginsModel.js";
import CustomersRoute from "./routes/CustomersRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import LoginsRoute from "./routes/LoginsRoute.js";

import { db } from "./db/Database.js";

const app = express();
dotenv.config();
process.env.TZ = "Asia/Makassar";

(async () => {
  await db.sync();
  await Customers.sync();
  await Users.sync();
  await Logins.sync();
})();

app.use(express.json());
app.use(cookieParser);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome!" });
});

app.use(CustomersRoute);
app.use(UsersRoute);
app.use(LoginsRoute);

app.listen(process.env.HTTP_PORT, () =>
  console.log(
    `Server running on port: http://localhost:${process.env.HTTP_PORT}`,
  ),
);
