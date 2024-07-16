import { Sequelize } from "sequelize";
import { db } from "../db/Database.js";
import Customers from "./CustomersModel.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
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
      type: DataTypes.STRING(400),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expireday: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiredate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM({
        values: ["0", "1"],
      }),
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

Customers.hasMany(Users);
Users.belongsTo(Customers, { foreignKey: "customerId" });

export default Users;
