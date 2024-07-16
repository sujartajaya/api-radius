import { Sequelize } from "sequelize";
import { db } from "../db/Database.js";
import Customers from "./CustomersModel.js";

const { DataTypes } = Sequelize;

const Logins = db.define(
  "logins",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM({
        values: ["user", "admin"],
      }),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  },
);
Customers.hasMany(Logins);
Logins.belongsTo(Customers, { foreignKey: "customerId" });

export default Logins;
