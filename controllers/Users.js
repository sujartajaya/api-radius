import Users from "../models/UsersModel.js";
import { sha1 } from "../utils/util.js";

export const getUsers = async (req, res) => {
  let response;
  try {
    response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Users.findOne({
      where: [{ id: id }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  let response;
  const { username, password, expireday, startdate, expiredate, status, customerId } = req.body;
  try {
    response = await Users.create({
      username: username,
      password: sha1(password),
      expireday: expireday,
      startdate: startdate,
      expiredate: expiredate,
      status: status,
      customerId: customerId,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  let response;
  const { id } = req.params;
  const { username, password, expireday, startdate, expiredate, status, customerId } = req.body;
  try {
    response = await Users.update(
      {
        username: username,
        password: sha1(password),
        expireday: expireday,
        startdate: startdate,
        expiredate: expiredate,
        status: status,
        customerId: customerId,
      },
      { where: [{ id: id }] },
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Users.destroy({ where: [{ id: id }] });
    res.status(202).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllUserByCustomer = async (req, res) => {};
