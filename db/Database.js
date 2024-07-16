import Sequelize from "sequelize";

export const db = new Sequelize("myradius", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
