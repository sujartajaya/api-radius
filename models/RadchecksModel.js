import { Sequelize } from "sequelize";
import { db } from "../db/Database.js";
import Users from "./UsersModel.js";
const { DataTypes } = Sequelize;

const Radchecks = db.define(
  "radchecks",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    property: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    userId: {
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

Users.hasMany(Radchecks);
Radchecks.belongsTo(Users, { foreignKey: "userId" });

export default Radchecks;
