import Logins from "../models/LoginsModel.js";
import bcrypt from "bcrypt";

export const createLogin = async (req, res) => {
  let response;
  const { username, password, confpassword, role, customerId } = req.body;
  try {
    if (password !== confpassword) {
      res.status(400).json({ msg: "Confirm password not match!" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      response = await Logins.create({
        username: username,
        password: hashPassword,
        role: role,
        customerId: customerId,
      });
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateLogin = async (req, res) => {
  let response;
  const { id } = req.params;
  const { username, role, customerId } = req.body;

  try {
    response = await Logins.findOne(
      { raw: true },
      {
        where: [{ uuid: id }],
      },
    );
    if (!response) {
      res.status(404).json({ msg: "Username not found!" });
    } else {
      //const salt = await bcrypt.genSalt();
      //const hashPassword = await bcrypt.hash(password, salt);
      const idlogin = response.id;
      let qr;
      qr = await Logins.update(
        {
          username: username,
          role: role,
          customerId: customerId,
        },
        {
          where: [{ id: idlogin }],
        },
      );
      res.status(201).json(qr);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  let response = null;
  const { id } = req.params;
  response = await findLogin(id);
  //console.log(id);
  //console.log("Hasil cek user = "+Object.keys(response).length);
  if (response !== null) {
    let qr;
    const { password, confpassword } = req.body;
    if (password === confpassword) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      try {
        qr = await Logins.update(
          {
            password: hashPassword,
          },
          {
            where: [{ id: response.id }],
          },
        );
        res.status(201).json(qr);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } else {
      res.status(400).json({ msg: "Confirm Password not match!" });
    }
  } else {
    res.status(404).json({ msg: "Username not found!" });
  }
};

/** Find Login User */
const findLogin = async (uuid) => {
  let response;
  try {
    response = await Logins.findOne({
      where: [{ uuid: uuid }],
    });
    //console.log("Username = "+response.username+" Role = "+response.role);
    return response;
  } catch (error) {
    return response;
  }
};
