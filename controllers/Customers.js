import Customers from "../models/CustomersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getCustomers = async (req, res) => {
  let response;
  try {
    response = await Customers.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomer = async (req, res) => {
  let response;
  try {
    const { id } = req.params;
    response = await Customers.findOne({
      where: [
        {
          id: id,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCustomer = async (req, res) => {
  let response;
  const { customer, pic, phone, address, status, email, password } = req.body;
  try {
    response = await Customers.create({
      customer: customer,
      pic: pic,
      phone: phone,
      address: address,
      status: status,
      email: email,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  let response;
  const { id } = req.params;
  const { customer, pic, phone, address, status } = req.body;
  try {
    await Customers.update(
      {
        customer: customer,
        pic: pic,
        phone: phone,
        address: address,
        status: status,
      },
      { where: [{ id: id }] },
    );
    res.status(200).json({ msg: "Customer updated!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customers.destroy({ where: [{ id: id }] });
    res.status(202).json({ msg: "Customer deleted!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCustomerByid = async (req, res) => {
  let response;
  try {
    response = await Customers.findOne({
      where: [
        {
          id: req.customerId,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
