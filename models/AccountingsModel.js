import { Sequelize } from "sequelize";
import { db } from "../db/Database.js";
const { DataTypes } = Sequelize;

const Accountings = db.define("accountings", {
  acc_status: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  acc_terminate_cause: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(400),
    allowNull: false,
  },
  acc_session_id: {
    type: DataTypes.STRING(400),
    allowNull: false,
  },
});
