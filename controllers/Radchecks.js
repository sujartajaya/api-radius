import Radchecks from "../models/RadchecksModel.js";

export const getRadchecks = async (req, res) => {
  let response;
  try {
    response = await Radchecks.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRadcheck = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Radchecks.findAll({
      where: [{ userid: id }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createRadcheck = async (req, res) => {
  let response;
  const { property, value, userId } = req.body;
  try {
    response = await Radcheck.create({
      property: property,
      value: value,
      userId: userId,
    });
    res.status(201).json(reponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateRadcheck = async (req, res) => {
  let response;
  const { id } = req.params;
  const { property, value, userId } = req.body;
  try {
    response = await Radcheck.create(
      {
        property: property,
        value: value,
        userId: userId,
      },
      { where: [{ id: id }] },
    );
    res.status(201).json(reponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteRadcheck = async (req, res) => {
  let response;
  const { id } = req.params;
  try {
    response = await Radchecks.destroy({ where: [{ id: id }] });
    res.status(202).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
